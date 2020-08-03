import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { auth } from './modules/auth'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://local/api'

export default new Vuex.Store({
  modules: {
    auth
  }
})
