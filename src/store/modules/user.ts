import UserService from '../../services/user.service'
import { User } from '@/models/user'

const initialStateUser = { user: User }
export const user = {
  namespaced: true,
  state: initialStateUser,
  getters: {

  },
  actions: {
    me ({ commit }) {
      return UserService.me().then(
        user => {
          commit('meSuccess', user)
          return Promise.resolve(user)
        },
        error => {
          commit('meFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    meSuccess (state, user: User) {
      state.user = user
    },
    meFailure (state) {
      state.user = null
    }
  }
}
