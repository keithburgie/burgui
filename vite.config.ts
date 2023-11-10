/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import eslint from "vite-plugin-eslint";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "burgui",
      fileName: (format) => `burgui.${format}.js`,
    },
    outDir: "lib",
    sourcemap: true,
    rollupOptions: {
      external: ["react", "react-dom", "react-router-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    eslint({
      exclude: ["/virtual:/**", "node_modules/**"],
    }),
  ],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["src/setupTest.ts"],
  },
});
