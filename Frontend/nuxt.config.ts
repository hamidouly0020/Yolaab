export default defineNuxtConfig({
  ssr: true,
  app: {
    baseURL: '/'
  },
  server: {
    host: '0.0.0.0',
    port: 3001,
    proxy: {
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3000'
    }
  }
})
