// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    target: 'static',
    ssr: false,
    modules: [
      '@nuxtjs/tailwindcss'
    ],
    tailwindcss: {
      cssPath: '~/assets/css/tailwind.css',
      configPath: 'tailwind.config.js',
      exposeConfig: false,
      config: {},
      injectPosition: 0,
      viewer: true,
    },
    publicRuntimeConfig:{
      base:process.env.NODE_ENV == "production" ? "/1D-Minesweeper/": "/"
    },
    app: {
      baseURL: process.env.NODE_ENV =="production" ? "/1D-Minesweeper": "/",
      buildAssetsDir: "/nuxt/",
      cdnURL:"/1D-Minesweeper"
    },
    router:{
      base:process.env.NODE_ENV =="production" ? "/1D-Minesweeper/": "/"
    }
})
