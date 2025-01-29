import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@lingui/vite-plugin";
import { createHtmlPlugin } from "vite-plugin-html";

let publicUrl = process.env.PUBLIC_URL;
if (publicUrl && !publicUrl.endsWith("/")) publicUrl += "/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    lingui(),
    createHtmlPlugin({
      inject: {
        data: { publicUrl },
      },
    }),
  ],
  resolve: {
    alias: {
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
    },
  },
});
