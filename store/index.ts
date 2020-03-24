import Vue from 'vue';
import Vuex from 'vuex';
import cookies from 'js-cookie';
import { MUTATIONS } from './mutationTypes';
import { User } from '@/src/interfaces/User';
import { Provider } from '@/src/interfaces/Provider';

Vue.use(Vuex);

interface AppState {
  auth: string | null;
  refresh: string | null;
  user: User | null;
  provider: Provider | null;
}

/**
 * Application store
 */
export const state = (): AppState => {
  return { auth: null, refresh: null, provider: null, user: null };
};

/**
 * Store mutations
 * Sync operations to change state
 */
export const mutations = {
  [MUTATIONS.SET_AUTH](state: AppState, authToken: string): void {
    state.auth = authToken;
  },

  [MUTATIONS.RESET_AUTH](state: AppState, payload = null): void {
    state.auth = payload;
    state.refresh = payload;
    state.user = payload;
  },

  [MUTATIONS.SET_USER](state: AppState, user: User): void {
    state.user = user;
  },

  [MUTATIONS.SET_PROVIDER](state: AppState, provider: Provider): void {
    state.provider = provider;
  },
};

/**
 * Actions than calls the mutations to change state
 * Could be async
 */
export const actions: any = {
  async nuxtServerInit({ commit, dispatch }: any, { req }: any): Promise<void> {
    const authCookie = req.cookies?.auth || null;

    commit(MUTATIONS.SET_AUTH, authCookie);

    await dispatch('getUser', authCookie);
  },

  getUser({ commit }: any, accessToken = cookies.get('auth')): void {
    if (accessToken)
      this.$axios
        .$get('user/', {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        })
        .then((user: User) => {
          commit(MUTATIONS.SET_USER, user);
        });
  },
};
