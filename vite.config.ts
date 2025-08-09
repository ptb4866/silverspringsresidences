import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "next/link": path.resolve(__dirname, "src/next-link-shim.tsx"),
      "next/image": path.resolve(__dirname, "src/next-image-shim.tsx"),
      "next/navigation": path.resolve(__dirname, "src/next-navigation-shim.ts"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
