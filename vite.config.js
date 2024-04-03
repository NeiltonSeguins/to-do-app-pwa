import process from "node:process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import replace from "@rollup/plugin-replace";

const pwaOptions = {
  mode: "development",
  base: "/",
  includeAssets: ["favicon.png"],
  manifest: {
    theme_color: "#5a189a",
    background_color: "#09001a",
    display: "standalone",
    description: "App de Lista de Tarefas em React",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
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
    devOptions: {
      enabled: process.env.SW_DEV === "true",
      type: "module",
      navigateFallback: "index.html",
    },
  },
};

const replaceOptions = {
  __DATE__: new Date().toISOString(),
  preventAssignment: true,
};
const claims = process.env.CLAIMS === "true";
const reload = process.env.RELOAD_SW === "true";
const selfDestroying = process.env.SW_DESTROY === "true";

if (process.env.SW === "true") {
  pwaOptions.srcDir = "src";
  pwaOptions.filename = claims ? "sw-claims.js" : "sw-prompt.js";
  pwaOptions.strategies = "injectManifest";
  pwaOptions.manifest.name = "To Do List";
  pwaOptions.manifest.short_name = "To Do";
  pwaOptions.injectManifest = {
    minify: false,
    enableWorkboxModulesLogs: true,
  };
}

if (claims) pwaOptions.registerType = "autoUpdate";

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = "true";
}

if (selfDestroying) pwaOptions.selfDestroying = selfDestroying;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions), replace(replaceOptions)],
});
