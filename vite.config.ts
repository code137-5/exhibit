import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: [
      { find: "@models", replacement: path.resolve(__dirname, "public/models") },
      { find: "@public", replacement: path.resolve(__dirname, "public") },
      { find: "@image", replacement: path.resolve(__dirname, "image") },
      { find: "@src", replacement: path.resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
    ],
  },
  build: {
    rollupOptions: {
      input: {
        web: resolve(__dirname, './index_web.html'),
        mobile: resolve(__dirname, './index_mobile.html'),
        lite: resolve(__dirname, './index_lite.html'),
      },
      output: [
        {
          name: "web",
          dir: "dist_web",
        },
        {
          name: "mobile",
          dir: "dist_mobile",
        },
        {
          name: "lite",
          dir: "dist_lite",
        }
      ]
    },
  },
  // root: './',
  // build: {
  //     outDir: 'dist',
  // },
  // publicDir: 'public'
})
