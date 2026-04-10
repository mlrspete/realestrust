import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Custom domains should publish from the site root. If we ever need a
// subdirectory deployment again, we can override it via PAGES_BASE_PATH.
const pagesBase = process.env.PAGES_BASE_PATH || "/";

export default defineConfig({
  plugins: [react()],
  base: pagesBase,
});
