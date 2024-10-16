import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { VitePWA } from "vite-plugin-pwa";
import checker from "vite-plugin-checker";
import { createHtmlPlugin } from "vite-plugin-html";
import { woff2BrowserPlugin } from "../scripts/woff2/woff2-vite-plugins";

// To load .env.local variables
const envVars = loadEnv("", `../`);
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(envVars.VITE_APP_PORT || 3000),
    // open the browser
    open: true,
  },
  // We need to specify the envDir since now there are no
  //more located in parallel with the vite.config.ts file but in parent dir
  envDir: "../",
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        assetFileNames(chunkInfo) {
          if (chunkInfo?.name?.endsWith(".woff2")) {
            // put on root so we are flexible about the CDN path
            return "[name]-[hash][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
        // Creating separate chunk for locales except for en and percentages.json so they
        // can be cached at runtime and not merged with
        // app precache. en.json and percentages.json are needed for first load
        // or fallback hence not clubbing with locales so first load followed by offline mode works fine. This is how CRA used to work too.
        manualChunks(id) {
          if (
            id.includes("packages/excalidraw/locales") &&
            id.match(/en.json|percentages.json/) === null
          ) {
            const index = id.indexOf("locales/");
            // Taking the substring after "locales/"
            return `locales/${id.substring(index + 8)}`;
          }
        },
      },
    },
    sourcemap: true,
    // don't auto-inline small assets (i.e. fonts hosted on CDN)
    assetsInlineLimit: 0,
  },
  plugins: [
    woff2BrowserPlugin(),
    react(),
    checker({
      typescript: true,
      eslint:
        envVars.VITE_APP_ENABLE_ESLINT === "false"
          ? undefined
          : { lintCommand: 'eslint "./**/*.{js,ts,tsx}"' },
      overlay: {
        initialIsOpen: envVars.VITE_APP_COLLAPSE_OVERLAY === "false",
        badgeStyle: "margin-bottom: 4rem; margin-left: 1rem",
      },
    }),
    svgrPlugin(),
    ViteEjsPlugin(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  publicDir: "../public",
});
