import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@lingui/vite-plugin";
import { createHtmlPlugin } from "vite-plugin-html";

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
        data: {
          publicUrl: process.env.PUBLIC_URL,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
    },
  },
});
