import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      mode: "development",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "service-worker.js",
      injectManifest: {
        sourcemap: true,
        enableWorkboxModulesLogs: true,
        globPatterns: ["**/*.{js,jsx,css,html}"],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
      manifest: {
        theme_color: "#5a189a",
        background_color: "#09001a",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "To Do App PWA",
        short_name: "To Do",
        description: "App de Lista de Tarefas em React",
        orientation: "portrait",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
