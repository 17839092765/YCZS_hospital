import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chailouFalg: false,
    baojing: false,
  },

  mutations: {
    chailouFalg(state, flag) {
      state.chailouFalg = flag;
    },
    baojing(state, flag) {
      state.baojing = flag;
    },
  },
  actions: {},
  modules: {},
});
