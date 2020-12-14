
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
      '~/assets/css/transitions.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios', // add this
    '@nuxtjs/auth-next',
  ],

  // add this Axios object
  axios: {
    baseURL: "http://localhost:8000/api/v1"
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: 'Token'
        },
        endpoints: {
          login: {
            url: '/login/',
            method: 'post',
            propertyName: 'auth_token',
          },
          logout: { url: '/logout/', method: 'post' },
          user: {
            url: '/user/',
            method: 'get',
          },
        },
        tokenType: 'Token',
        tokenName: 'Authorization',
      },

    },
    redirect: {
      login: '/login',
      home: '/',
    },
  },


}
