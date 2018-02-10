const resolve = require('path').resolve

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'DealsWill Online Shopping Promotions - The Latest Coupons & Promo Codes - DealsWill.com',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'DealsWill Online Shopping Promotions - The Latest Coupons & Promo Codes - DealsWill.com' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'vue2-toast/lib/toast.css',
        // 项目中的 Sass 文件
    { src: '~assets/css/base.scss', lang: 'scss' }, // 指定 scss 而非 sass
    { src: '~assets/css/common.scss', lang: 'scss' } // 指定 scss 而非 sass
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  cache: {
    max: 1000,
    maxAge: 900000
  },
  dev: (process.env.NODE_ENV !== 'production'),
  plugins: ['~plugins/vue-svg-icon', '~plugins/vue-scrollto', '~plugins/vue2-toast', '~plugins/mint-ui', '~plugins/config'],
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    vendor: [
      './utils/Global.js',
      './utils/utils.js',
      './utils/fetch.js',
      'axios',
      'qs'
    ],
    babel: {
      'plugins': [['component', [
        {
          'libraryName': 'mint-ui',
          'style': true
        }
      ]]]
    },
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    extendRoutes(routes) {
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/notFound.vue')
      })
    },
    scrollBehavior(to, from, savedPosition) {
      // savedPosition 只有在 popstate 导航（如按浏览器的返回按钮）时可以获取。
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        // 目标页面子组件少于两个
        if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
          // 如果目标页面子组件中存在配置了scrollToTop为true
          position = { x: 0, y: 0 }
        }
        // 如果目标页面的url有锚点,  则滚动至锚点所在的位置
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  }
}
