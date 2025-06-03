// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
   app:{
    head: {
      title: 'River of Babel', // default fallback title
      htmlAttrs: {
        lang: 'en',
      }}
   } ,
   seo: {
    meta: {
      description: 'Translate music streaming links.',
      colorScheme: 'dark light',
      author: 'Benjamin Goodheart'
    }},
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    'nuxt-gtag',
    '@nuxtjs/seo'
  ],
  gtag: {
    id: 'G-CD6BPEZN4W'
  },
  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2024-11-27'
})