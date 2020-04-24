module.exports = {
  mode: 'universal',
  head: {
    server: {
      port: process.env.PORT || '3000',
    },
    title:
      'OpenWiden • Help out open source projects' ||
      process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#fff' },
  typescript: {
    typeCheck: {
      eslint: true,
    },
  },
  css: [
    '@/src/global/variables.css',
    '@/src/global/fonts.css',
    '@/src/global/global.css',
  ],
  plugins: ['@/plugins/axios', '@/plugins/api'],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
  ],
  modules: ['@nuxtjs/axios'],

  axios: {
    baseURL: 'https://openwiden.com/api/v1/',
    timeout: 5000,
  },
  build: {
    postcss: {
      plugins: {
        'postcss-nested': {},
        'postcss-hexrgba': {},
      },
    },
    extend() {},
  },
};
