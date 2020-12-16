import AuthService from '~/services/AuthService.js'
import axios from 'axios'

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER (state, user) {
    state.authUser = user
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt before server-rendering every page
//   nuxtServerInit ({ commit }, { req }) {
//     if (req.session && req.session.authUser) {
//       commit('SET_USER', req.session.authUser)
//     }
//   },
  async login ({ commit, redirect }, { email, password }) {
    try {
      const response = await AuthService.login({ email, password })
      console.log('-----data', response);
      commit('SET_USER', response)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  }

}
