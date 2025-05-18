/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@layouts": path.resolve(__dirname, "src/app/layouts"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@widgets": path.resolve(__dirname, "src/widgets"),
      "@routes": path.resolve(__dirname, "src/app/routes"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
});
