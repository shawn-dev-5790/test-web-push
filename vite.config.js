// vite.config.js
import { defineConfig } from "vite";
import { readFileSync } from "fs";

export default defineConfig({
  // other vite options...
  plugins: [
    {
      name: "sw",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/service-worker.js") {
            res.setHeader("Content-Type", "application/javascript");
            res.end(readFileSync("./service-worker.js"));
          } else {
            next();
          }
        });
      },
    },
  ],
});
