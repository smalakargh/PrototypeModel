import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import vitePluginInjectDataLocator from "./plugins/vite-plugin-inject-data-locator";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginInjectDataLocator(), tailwindcss()],
  base: '/',
  server: {
    allowedHosts: true,
    port: 3000,
    open: true,
    host: true,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          heroui: ['@heroui/react'],
          icons: ['@iconify/react'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@heroui/react', '@iconify/react'],
  },
  css: {
    devSourcemap: true,
  },
});