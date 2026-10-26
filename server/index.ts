import connectPgSimple from "connect-pg-simple";
import express, { type Request } from "express";
import { rateLimit } from "express-rate-limit";
import session from "express-session";
import { createHash, timingSafeEqual } from "node:crypto";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";

declare module "express-session" {
  interface SessionData {
    isAdmin?: boolean;
  }
}

if (!process.env.NODE_ENV) process.env.NODE_ENV = "production";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";
const adminSessionCookieName = "her-world-admin.sid";
const adminSessionDurationMs = 8 * 60 * 60 * 1000;
const adminSessionDurationSeconds = adminSessionDurationMs / 1000;

interface AdminAuthConfig {
  enabled: boolean;
  password?: string;
  pool?: Pool;
}

function passwordMatches(candidate: string, expected: string) {
  const candidateDigest = createHash("sha256").update(candidate).digest();
  const expectedDigest = createHash("sha256").update(expected).digest();
  return timingSafeEqual(candidateDigest, expectedDigest);
}

function sameOriginRequest(req: Request) {
  const origin = req.get("origin");
  if (!origin) return true;
  return origin === `${req.protocol}://${req.get("host")}`;
}

async function configureAdminAuth(app: express.Express): Promise<AdminAuthConfig> {
  const password = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  const databaseUrl = process.env.DATABASE_URL;
  const missingVariables = [
    !password || password.length < 16 ? "ADMIN_PASSWORD (minimum 16 characters)" : null,
    !sessionSecret || Buffer.byteLength(sessionSecret, "utf8") < 32
      ? "ADMIN_SESSION_SECRET (minimum 32 bytes)"
      : null,
    !databaseUrl ? "DATABASE_URL (PostgreSQL connection string)" : null,
  ].filter((value): value is string => value !== null);

  if (missingVariables.length > 0 || !password || !sessionSecret || !databaseUrl) {
    console.warn(
      `Admin sign-in is disabled. Configure these hosting variables: ${missingVariables.join(", ")}.`,
    );
    return { enabled: false };
  }

  const pool = new Pool({ connectionString: databaseUrl, connectionTimeoutMillis: 5000 });
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "admin_sessions" (
        "sid" varchar NOT NULL,
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL,
        CONSTRAINT "admin_sessions_pkey" PRIMARY KEY ("sid")
      )
    `);
    await pool.query(
      'CREATE INDEX IF NOT EXISTS "IDX_admin_sessions_expire" ON "admin_sessions" ("expire")',
    );

    if (isProduction) app.set("trust proxy", 1);

    const PgSessionStore = connectPgSimple(session);
    const store = new PgSessionStore({
      pool,
      tableName: "admin_sessions",
      ttl: adminSessionDurationSeconds,
      pruneSessionInterval: 15 * 60,
    });

    app.use(
      session({
        name: adminSessionCookieName,
        store,
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
          httpOnly: true,
          secure: isProduction,
          sameSite: "lax",
          maxAge: adminSessionDurationMs,
          path: "/",
        },
      }),
    );

    console.log("Admin sign-in is enabled with PostgreSQL-backed sessions.");
    return { enabled: true, password, pool };
  } catch (error) {
    await pool.end().catch(() => undefined);
    console.error(
      "Admin sign-in is disabled because its PostgreSQL session store could not be initialized.",
      error,
    );
    return { enabled: false };
  }
}

function registerAdminRoutes(app: express.Express, auth: AdminAuthConfig) {
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many sign-in attempts. Please try again later." },
  });

  app.get("/api/admin/session", (req, res) => {
    res.set("Cache-Control", "no-store");
    res.json({
      enabled: auth.enabled,
      authenticated: auth.enabled && req.session?.isAdmin === true,
    });
  });

  app.post("/api/admin/login", loginLimiter, (req, res, next) => {
    res.set("Cache-Control", "no-store");
    if (!auth.enabled || !auth.password) {
      res.status(503).json({ error: "Admin sign-in is not configured." });
      return;
    }
    if (!sameOriginRequest(req)) {
      res.status(403).json({ error: "Sign-in request was rejected." });
      return;
    }

    const password = req.body?.password;
    if (
      typeof password !== "string" ||
      password.length > 1024 ||
      !passwordMatches(password, auth.password)
    ) {
      res.status(401).json({ error: "Invalid password." });
      return;
    }

    req.session.regenerate((regenerateError) => {
      if (regenerateError) return next(regenerateError);
      req.session.isAdmin = true;
      req.session.save((saveError) => {
        if (saveError) return next(saveError);
        res.json({ authenticated: true });
      });
    });
  });

  app.post("/api/admin/logout", (req, res, next) => {
    res.set("Cache-Control", "no-store");
    if (!sameOriginRequest(req)) {
      res.status(403).json({ error: "Sign-out request was rejected." });
      return;
    }

    const clearCookie = () => {
      res.clearCookie(adminSessionCookieName, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
      });
      res.json({ authenticated: false });
    };

    if (!req.session) {
      clearCookie();
      return;
    }

    req.session.destroy((error) => {
      if (error) return next(error);
      clearCookie();
    });
  });
}

async function startServer() {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json({ limit: "10kb" }));

  const adminAuth = await configureAdminAuth(app);
  registerAdminRoutes(app, adminAuth);

  // Direct requests to the dashboard are redirected unless the server session is valid.
  app.get("/dashboard", (req, res, next) => {
    if (!adminAuth.enabled || req.session?.isAdmin !== true) {
      res.redirect(302, "/admin-login");
      return;
    }
    next();
  });

  const staticPath = isProduction
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const server = createServer(app);
  if (adminAuth.pool) server.on("close", () => void adminAuth.pool?.end());

  const port = Number(process.env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}.`);
  });
}

startServer().catch((error) => {
  console.error("Server startup failed.", error);
  process.exitCode = 1;
});
