import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";

const PROJECT_ROOT = import.meta.dirname;

function escapeHtmlAttribute(value: string) {
  return value.replace(/[&<>"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
    };
    return entities[character];
  });
}

function optionalAnalyticsPlugin(env: Record<string, string>): Plugin {
  return {
    name: "optional-analytics",
    transformIndexHtml(html) {
      const analyticsEndpoint = env.VITE_ANALYTICS_ENDPOINT?.trim().replace(/\/+$/, "");
      const websiteId = env.VITE_ANALYTICS_WEBSITE_ID?.trim();
      if (!analyticsEndpoint || !websiteId) return html;

      const endpointUrl = new URL(analyticsEndpoint);
      if (endpointUrl.protocol !== "https:" && endpointUrl.protocol !== "http:") {
        throw new Error("VITE_ANALYTICS_ENDPOINT must use HTTP or HTTPS.");
      }

      const analyticsScript =
        `    <script defer src="${escapeHtmlAttribute(`${analyticsEndpoint}/umami`)}" ` +
        `data-website-id="${escapeHtmlAttribute(websiteId)}"></script>\n`;
      return html.replace("</body>", `${analyticsScript}  </body>`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, PROJECT_ROOT, "");

  return {
    plugins: [react(), tailwindcss(), optionalAnalyticsPlugin(env)],
    resolve: {
      alias: {
        "@": path.resolve(PROJECT_ROOT, "client", "src"),
        "@shared": path.resolve(PROJECT_ROOT, "shared"),
        "@assets": path.resolve(PROJECT_ROOT, "attached_assets"),
      },
    },
    envDir: PROJECT_ROOT,
    root: path.resolve(PROJECT_ROOT, "client"),
    build: {
      outDir: path.resolve(PROJECT_ROOT, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      strictPort: false,
      host: true,
      allowedHosts: ["localhost", "127.0.0.1"],
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
