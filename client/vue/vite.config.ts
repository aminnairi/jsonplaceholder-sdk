import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  root: "src",
  plugins: [
    vue()
  ],
  server: {
    port: 9000,
    host: "0.0.0.0"
  }
});
