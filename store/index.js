import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = () => {
  return { auth: null, user: null };
};

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
  },

  setUser(state, user) {
    state.user = user;
  },
};

export const actions = {
  nuxtServerInit({ commit }, { req, $axios }) {
    const authCookie = req.cookies?.auth || null;

    commit('setAuth', authCookie);

    if (authCookie)
      return $axios
        .$get(`users/`, {
          headers: {
            Authorization: `JWT ${authCookie}`,
          },
        })
        .then((resp) => commit('setUser', resp));
  },
};
