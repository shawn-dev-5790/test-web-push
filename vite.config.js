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
          if (req.url === "/sw.js") {
            res.setHeader("Content-Type", "application/javascript");
            // Use readFileSync to read the content of sw.js file
            res.end(readFileSync("./sw.js"));
          } else {
            next();
          }
        });
      },
    },
  ],
});
