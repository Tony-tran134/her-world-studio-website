# Production deployment

## Build and start

Use Node.js 24 and the pnpm version pinned in `package.json` (10.4.1):

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm start
```

The Express server serves the built client from `dist/public` and listens on the
host-provided `PORT` (or port 3000 when running locally). The start command
defaults `NODE_ENV` to `production`; set it explicitly in the hosting service
when appropriate.

## Admin sign-in

Admin sign-in stays disabled unless all of these server-side environment
variables are set:

- `ADMIN_PASSWORD`: a unique password of at least 16 characters.
- `ADMIN_SESSION_SECRET`: at least 32 bytes of random secret material. Generate
  one locally with Node.js, then paste it directly into the hosting provider's
  secret-variable settings; do not put it in this repository or send it in chat:

  ```sh
  node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
  ```

- `DATABASE_URL`: the PostgreSQL connection string for the host's database.
  The database role must be allowed to create a table and index. The app creates
  its `admin_sessions` table automatically. Use the connection string and TLS
  settings supplied by the database host.

The app keeps sessions in PostgreSQL, regenerates the session ID after login,
and expires sessions after eight hours of inactivity. The session cookie is
HTTP-only, `SameSite=Lax`, and `Secure` in production. Login is rate-limited to
10 attempts per client IP per 15 minutes. Configure the Express trusted-proxy
hop count to match the hosting provider if it uses a reverse proxy; the current
production setting trusts one proxy hop.

If a required variable is missing, the password is too short, or the session
database cannot initialize, admin sign-in is disabled. There is no fallback or
demo password. Configure these values in the host's environment/secret settings,
not in a committed `.env` file. Do not prefix these secrets with `VITE_`.

The dashboard currently contains sample bookings and figures only. They are
labelled as demo data and are not connected to a business database or Bokadirekt.

## Optional analytics

Analytics is omitted unless both `VITE_ANALYTICS_ENDPOINT` and
`VITE_ANALYTICS_WEBSITE_ID` are provided to the build. These are public client
configuration values, not secrets. Omitting them is supported.

For an initial deployment, use one app instance unless a shared rate-limit store
is added: sessions work across instances through PostgreSQL, while the login
rate-limit counter is held in each process's memory.
