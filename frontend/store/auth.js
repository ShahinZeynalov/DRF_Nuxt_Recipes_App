import AuthService from '~/services/AuthService.js'
import axios from 'axios'
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  authUser: null,
  
})

export const mutations = {
  SET_USER(state, user) {
    state.authUser = user
    Cookie.set('auth', user)
  }
}

export const actions = {
  // async nuxtServerInit({ commit }, { req }) {
  //   console.log('nuxt server init worked in auth');
  //   if (req.session) {
  //     //   commit('user', req.session.user)
  //     console.log('-adad');
  //   }
  // },
  async me({ commit }, { config }) {
    console.log('------------- user me');
    const response = await AuthService.me({ config })
    commit('SET_USER', response.data)
    console.log('-------fuccckkking', response.data);
  },
  async login({ commit }, { email, password }) {
    try {
      const response = await AuthService.login({ email, password })
      console.log('-----data', response.data);
      commit('SET_USER', response.data)

    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  }

}
