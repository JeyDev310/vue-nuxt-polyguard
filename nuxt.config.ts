// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ref: https://github.com/nitrojs/nitro/blob/v2/src/presets/netlify/preset.ts
  // [nitro] Building Nuxt Nitro server (preset: `netlify-legacy`, compatibility date: `2024-05-06`)
  // without preset: `netlify-legacy` the <NuxtLayout> component wont work`
  compatibilityDate: '2024-05-06',

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    // The private keys which are only available within server-side
    auth: {
      jwtSecret: '',
    },
    session: {
      password: '',
    },
    bigcommerce: {
      storeHash: '',
      accessToken: '',
      clientId: '',
      clientSecret: '',
      defaultChannelId: '',
    },
    craftcms: {
      gqlApiToken: '',
    },
    sendgrid: {
      apiKey: '',
    },
    turso: {
      databaseUrl: '',
      authToken: '',
    },
    // Keys within public, will be also exposed to the client-side
    public: {
      site: {
        siteName: 'Polyguard',
        publicUrl: '',
        pwResetPath: '',
        fromEmail: '',
      },
      env: {
        cmsBaseUrl: '',
        cmsGqlUrl: '',
        cmsRestApiUrl: '',
        context: 'development',
        stage: 'development',
      },
      sentry: {
        dsn: '',
      },
    },
  },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },

  sitemap: {
    cacheMaxAgeSeconds: 600, // 10 minutes
    sources: ['/api/v1/routes/dynamic-routes'],
  },

  modules: [
    '@nuxt/devtools',
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@vueuse/nuxt',
    '@sentry/nuxt/module',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      Montserrat: {
        wght: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
      },
      Inter: {
        wght: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
      },
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
  },

  css: ['assets/css/typography.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['dotlottie-player'].includes(tag),
    },
  },

  sentry: {
    sourceMapsUploadOptions: {
      org: 'bezar',
      project: 'polyguard-nuxt',
    },

    autoInjectServerSentry: 'top-level-import',
  },

  sourcemap: {
    client: 'hidden',
  },

  routeRules: {
    '/api/v1/menus/**': { swr: 600 },
    '/api/v1/singles/**': { swr: 600 },
  },
})
