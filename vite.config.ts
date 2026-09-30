import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages: site lives at /portfolio/, so all built asset URLs must carry that base.
export default defineConfig({
  base: "/portfolio/",
  plugins: [react()],
});
