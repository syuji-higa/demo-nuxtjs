import { resolve } from 'path'

const env = process.env.NODE_ENV
const envFile = `.env.${env}`

require('dotenv').config({ path: resolve(__dirname, 'env', envFile) })

export default {
  mode: 'spa',
  srcDir: 'src/',
  router: {
    base: process.env.BASE_DIR
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL
  },
  /*
   ** Headers of the page
   */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** First access loader
   */
  loadingIndicator: {
    name: '~/template/spa-loading.html'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'sanitize.css',
    '~/assets/css/global.scss',
    '~/assets/css/utils/show.scss'
  ],
  /*
   ** Common Style Resources
   */
  styleResources: {
    scss: [
      '~/assets/css/_easing.scss',
      '~/assets/css/_function.scss',
      '~/assets/css/_setting.scss',
      '~/assets/css/mixins/*.scss'
    ]
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/composition-api', '~/plugins/vee-validate'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-composition-api',
    '@nuxtjs/style-resources',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend() {},
    transpile: ['vee-validate/dist/rules']
  }
}
