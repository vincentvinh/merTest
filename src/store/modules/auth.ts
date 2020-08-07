import AuthService from '../../services/auth.service'
import { User } from '@/models/user'

const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
const initialStateToken = token
  ? { status: { loggedIn: true }, token }
  : { status: { loggedIn: false }, token: null }
export const auth = {
  namespaced: true,
  state: initialStateToken,
  actions: {
    login ({ commit }, user: User) {
      console.log(user)
      return AuthService.login(user).then(
        token => {
          commit('loginSuccess', token)
          return Promise.resolve(token)
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      )
    },
    logout ({ commit }) {
      AuthService.logout()
      commit('logout')
    },
    register ({ commit }, user: User) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess')
          return Promise.resolve(response.data)
        },
        error => {
          commit('registerFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    loginSuccess (state, token) {
      state.status.loggedIn = true
      state.token = token
    },
    loginFailure (state) {
      state.status.loggedIn = false
      state.token = null
    },
    logout (state) {
      state.status.loggedIn = false
      state.token = null
    },
    registerSuccess (state) {
      state.status.loggedIn = false
    },
    registerFailure (state) {
      state.status.loggedIn = false
    }
  }
}
