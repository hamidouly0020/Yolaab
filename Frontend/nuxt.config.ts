export default defineNuxtConfig({
  ssr: true,
  css: ['~/assets/css/global.css'],
  app: {
    baseURL: '/',
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap'
        }
      ]
    }
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
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    presets: {
      thumbnail: {
        modifiers: {
          width: 300,
          height: 200,
          fit: 'cover',
        },
      },
      productCard: {
        modifiers: {
          width: 400,
          height: 300,
          fit: 'cover',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3000'
    }
  },
  routeRules: {
    '/products/**': { cache: { maxAge: 60 * 10 } },
    '/realisations/**': { cache: { maxAge: 60 * 10 } },
  },
})
