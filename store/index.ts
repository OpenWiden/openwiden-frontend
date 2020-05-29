import Vue from 'vue';
import Vuex, { MutationTree } from 'vuex';
import cookies from 'js-cookie';

import { MUTATIONS } from './mutationTypes';
import { User } from '@/src/interfaces/User/User';
import { Provider } from '@/src/interfaces/Provider';
import { Filter } from '@/src/interfaces/Filters';
import { AuthorizationTokens } from '~/src/interfaces/AuthorizationTokens/AuthorizationTokens';
import { AppState } from '@/src/interfaces/AppState';

import removeCookies from '@/src/lib/removeCookies';

Vue.use(Vuex);

/**
 * Application store
 */
export const state = (): AppState => {
  return {
    auth: null,
    refresh: null,
    provider: null,
    user: null,
    filters: {
      [Filter.STARS_COUNT_GTE]: null,
      [Filter.OPEN_ISSUES_COUNT_GTE]: null,
      [Filter.FORKS_COUNT]: null,
      [Filter.PROGRAMMING_LANGUAGE]: null,
      [Filter.VERSION_CONTROL_SERVICE]: null,
      [Filter.CREATED_AT]: null,
      [Filter.UPDATED_AT]: null,
    },
  };
};

/**
 * Store mutations. Sync operations to change state
 */
export const mutations: MutationTree<AppState> = {
  [MUTATIONS.SET_AUTH](state, authToken: string): void {
    state.auth = authToken;
  },

  [MUTATIONS.RESET_AUTH](state, payload = null): void {
    state.auth = payload;
    state.refresh = payload;
    state.provider = payload;
    state.user = payload;
  },

  [MUTATIONS.SET_REFRESH](state, payload: string): void {
    state.refresh = payload;
  },

  [MUTATIONS.SET_USER](state, user: User): void {
    state.user = user;
  },

  [MUTATIONS.SET_PROVIDER](state, provider: Provider): void {
    state.provider = provider;
  },

  [MUTATIONS.SET_FILTER](
    state: AppState,
    { name, value }: { name: Filter; value: any }
  ): void {
    state.filters[name] = value;
  },
};

/**
 * Actions than calls the mutations to change state. Could be async
 */
export const actions: any = {
  async nuxtServerInit({ commit, dispatch }: any, { req }: any): Promise<void> {
    const authToken = req.cookies?.auth || null;
    const refreshToken = req.cookies?.refresh || null;
    const provider = req.cookies?.provider || null;

    console.log('actions -->', provider);

    commit(MUTATIONS.SET_PROVIDER, provider);
    commit(MUTATIONS.SET_AUTH, authToken);
    commit(MUTATIONS.SET_REFRESH, refreshToken);

    await dispatch('getUser', { authToken, refreshToken });
  },

  logoutUser({ commit }: any) {
    removeCookies(['auth', 'refresh', 'provider']);
    commit(MUTATIONS.RESET_AUTH);
  },

  loginUser({ commit }: any, { provider }: { provider: string }) {
    cookies.set('provider', provider);
    commit(MUTATIONS.SET_PROVIDER, provider);
  },

  setAuthTokens(
    { commit }: any,
    { authToken, refreshToken }: AuthorizationTokens
  ) {
    cookies.set('auth', authToken);
    cookies.set('refresh', refreshToken);

    commit(MUTATIONS.SET_AUTH, authToken);
    commit(MUTATIONS.SET_REFRESH, refreshToken);
  },

  async getUser(
    { commit }: any,
    { authToken, refreshToken }: AuthorizationTokens
  ): Promise<void | null> {
    if (!authToken) return null;

    const { getUser, getRefreshedToken } = this.$api;

    try {
      const user = await getUser(authToken);

      commit(MUTATIONS.SET_USER, user);
    } catch ({ response }) {
      if (response.status === 403) {
        const { access } = await getRefreshedToken(refreshToken);
        const user = await getUser(access);

        commit(MUTATIONS.SET_AUTH, access);
        commit(MUTATIONS.SET_USER, user);
      }
    }
  },
};
