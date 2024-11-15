/** @type {import('vite').UserConfig} */

export default {
  server: {
    port: 1234,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
      },
    },
  },
  base: './',
  build: {
    outDir: './docs',
  },
};
