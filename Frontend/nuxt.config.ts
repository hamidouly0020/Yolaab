export default defineNuxtConfig({
  ssr: true,
  app: {
    baseURL: '/'
  },
  server: {
    host: '0.0.0.0',
    port: 3001
  },
  modules: ['@nuxtjs/tailwindcss'],
})
