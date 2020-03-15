import Vue from 'vue';
import Vuex from 'vuex';
import cookies from 'js-cookie';

Vue.use(Vuex);

export const state = () => {
  return { auth: null, user: null };
};

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
  },

  resetAuth(state, payload = null) {
    state.auth = payload;
    state.refresh = payload;
    state.user = payload;
  },

  setUser(state, user) {
    state.user = user;
  },
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    const authCookie = req.cookies?.auth || null;

    commit('setAuth', authCookie);

    await dispatch('getUser', authCookie);
  },

  getUser({ commit }, accessToken = cookies.get('auth')) {
    if (accessToken)
      return this.$axios
        .$get('users/', {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        })
        .then((user) => {
          commit('setUser', user);
        });
  },
};
