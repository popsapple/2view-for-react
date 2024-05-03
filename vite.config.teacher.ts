import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as PATH from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  root: PATH.resolve(process.cwd(), './src'),
  plugins: [react(), tsconfigPaths()],
  server: {
    host: '0.0.0.0',
    port: 9001,
    https: undefined,
    cors: true,
    hmr: true,
  },
  base: './',
  build: {
    outDir: PATH.resolve(process.cwd(), './dist-teacher'),
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
       input: {
        teacher: './src/teacher.html'
      },
      output: {
        entryFileNames: () => {
          return `js/[name].js`;
        },
        chunkFileNames: () => {
          return `js/[name].js`;
        },
      },
    },
  },
})
