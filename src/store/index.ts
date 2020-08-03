import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL = "http://trash.local/api";

import auth from "./modules/auth";

export default new Vuex.Store({
  modules: {
    auth
  },
});
