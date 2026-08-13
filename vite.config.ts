import { defineConfig, type Plugin, type Connect } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

function servePublicHtmlPages(): Plugin {
  const resolvePublicIndex = (url = "") => {
    const pathname = url.split("?")[0].split("#")[0];
    if (!pathname || pathname === "/") return null;
    if (pathname.includes(".")) return null;
    if (
      pathname.startsWith("/@") ||
      pathname.startsWith("/node_modules") ||
      pathname.startsWith("/src")
    ) {
      return null;
    }
    const rel = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
    if (!rel || rel.includes("..")) return null;
    const file = path.resolve(__dirname, "public", rel, "index.html");
    return fs.existsSync(file) ? file : null;
  };

  const handler: Connect.NextHandleFunction = (req, res, next) => {
    const file = resolvePublicIndex(req.url);
    if (!file) return next();
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(fs.readFileSync(file));
  };

  return {
    name: "serve-public-html-pages",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig({
  plugins: [servePublicHtmlPages(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    open: "/",
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        orisa: path.resolve(__dirname, "orisa.html"),
      },
    },
  },
});
