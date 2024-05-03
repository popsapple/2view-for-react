import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as PATH from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: PATH.resolve(process.cwd(), './src'),
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 9002,
    https: undefined,
    cors: true,
    hmr: true,
  },
  base: './',
  build: {
    outDir: PATH.resolve(process.cwd(), './dist-student'),
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
       input: {
        teacher: './src/student/index.html'
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
