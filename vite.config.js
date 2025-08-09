import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "next/link": path.resolve(__dirname, "src/compat/next-link.jsx"),
      "next/image": path.resolve(__dirname, "src/compat/next-image.jsx"),
      "next/navigation": path.resolve(
        __dirname,
        "src/compat/next-navigation.jsx"
      ),
    },
  },
});

