// export default defineNuxtConfig({
//   compatibilityDate: '2026-03-05',
//   ssr: false,
//   nitro: {
//     preset: 'static',
//     prerender: {
//       crawlLinks: true  // Need this to generate payload files for dynamic routes
//     },
//     compress: true,  // Enable compression
//     minify: true,    // Enable minification
//   },
//   vite: {
//     resolve: {
//       alias: {
//         '#app-manifest': '#app'
//       }
//     },
//     build: {
//       minify: 'terser',
//       rollupOptions: {
//         output: {
//           manualChunks: {
//             'vendor': ['vue']
//           }
//         }
//       }
//     }
//   },
//   css: ['~/assets/css/global.css'],
//   app: {
//     baseURL: '/',
//     head: {
//       link: [
//         {
//           rel: 'preconnect',
//           href: 'https://fonts.googleapis.com'
//         },
//         {
//           rel: 'preconnect',
//           href: 'https://fonts.gstatic.com',
//           crossorigin: ''
//         },
//         {
//           rel: 'stylesheet',
//           href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap'
//         }
//       ]
//     }
//   },
//   server: {
//     host: '0.0.0.0',
//     port: 3001,
//     proxy: {
//       '/uploads': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//       }
//     }
//   },
//   modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
//   image: {
//     screens: {
//       xs: 320,
//       sm: 640,
//       md: 768,
//       lg: 1024,
//       xl: 1280,
//       xxl: 1536,
//     },
//     presets: {
//       thumbnail: {
//         modifiers: {
//           width: 300,
//           height: 200,
//           fit: 'cover',
//         },
//       },
//       productCard: {
//         modifiers: {
//           width: 400,
//           height: 300,
//           fit: 'cover',
//         },
//       },
//     },
//   },
//   runtimeConfig: {
//     public: {
//       apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3000'
//     }
//   },
//   routeRules: {
//     '/products/**': { cache: { maxAge: 60 * 10 } },
//     '/realisations/**': { cache: { maxAge: 60 * 10 } },
//     '/reservation': { cache: { maxAge: 60 * 60 } },  // Cache reservation page for 1 hour
//     '/pressing': { cache: { maxAge: 60 * 60 } },  // Cache pressing page for 1 hour
//     '/services': { cache: { maxAge: 60 * 60 } },  // Cache services page for 1 hour
//     '/**': { cache: { maxAge: 60 * 5 } },      // Cache all other pages for 5 minutes
//   },
// })

export default defineNuxtConfig({
  compatibilityDate: '2026-03-05',
  ssr: false,

  nitro: {
    // Supprimer preset: 'static' — Vercel le détecte automatiquement
    compress: true,
    minify: true,
    // Security headers
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    },
  },

  vite: {
    build: {
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['vue']
          }
        }
      }
    }
    // Supprimer l'alias #app-manifest, il cause des problèmes
  },

  css: ['~/assets/css/global.css'],

  app: {
    baseURL: '/',
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'description', content: 'Yolaab - Services domestiques professionnels' },
        // Add security meta tags
        { httpEquiv: 'Content-Security-Policy', content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; connect-src 'self' http://localhost:3000 https://api.whatsapp.com" }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap' }
      ]
    }
  },

  server: {
    host: '0.0.0.0',
    port: 3001,
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],

  image: {
    // ... ta config image reste identique
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3000'
    }
  },

  // Supprimer les routeRules avec cache — incompatible avec ssr: false
})