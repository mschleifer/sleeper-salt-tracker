// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // app: {
  //   baseURL: '/', // baseURL: '/<repository>/'
  //   buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids nojkill conflict
  // },
  devtools: { enabled: false },
  typescript: {
    shim: false
  },
  modules: [
    'nuxt-primevue',
    '@nuxtjs/tailwindcss'
  ],
  css: ['primeicons/primeicons.css'],
  primevue: {
    options: {
      ripple: true,
      unstyled: true
    },
    importPT: { as: 'lara', from: '@@/presets/lara/' },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities'
  }
})
