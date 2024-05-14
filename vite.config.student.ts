import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as PATH from 'path';

// https://vitejs.dev/config/
export  function myPlugin() {
  return {
    name: 'my-plugin',
    async transform(code, id) {
      // 기본적으로 헤더에 붙이는걸 없애기 위함
      if((id + '').endsWith('css') === false) return;
      const escapedCode = code
      .replace('\\', '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');
      return `
        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(\`${escapedCode}\`);
        export default stylesheet;
      `;
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  root: PATH.resolve(process.cwd(), './src'),
  plugins: [react(), myPlugin()],
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
