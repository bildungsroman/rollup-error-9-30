import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({ exclude: ["**/_tests/**", "vite.config.mts", "vitest.config.ts"] }),
  ],
  build: {
    target: "esnext",
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "Plumage",
      fileName: (format: string) => `plumage.${format}.js`,
    },
    rollupOptions: {
      external: [resolve(__dirname, "src/index"), "react", "react-dom"],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  server: {
    port: 3000,
    fs: {
      cachedChecks: false,
    },
  },
  resolve: {
    alias: [],
  },
});
