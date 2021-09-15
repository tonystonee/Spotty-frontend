import { createStore } from "vuex";

export default createStore({
  state: {
    access_token: "",
    refresh_token: "",
  },
  getters: {
    access_token: (state) => {
      return state.access_token;
    },
    refresh_token: (state) => {
      return state.refresh_token;
    },
  },
  mutations: {
    set_access_token(state, access_token) {
      // mutate state
      state.access_token = access_token;
    },
    set_refresh_token(state, refresh_token) {
      // mutate state
      state.refresh_token = refresh_token;
    },
  },
  actions: {
    set_access_token(context, access_token) {
      context.commit("set_access_token", access_token);
    },
    set_refresh_token(context, refresh_token) {
      context.commit("set_refresh_token", refresh_token);
    }
  },
  modules: {},
});
