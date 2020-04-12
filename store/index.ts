import Vue from 'vue';
import Vuex from 'vuex';
import cookies from 'js-cookie';
import { MUTATIONS } from './mutationTypes';
import { User } from '@/src/interfaces/User';
import { Provider } from '@/src/interfaces/Provider';
import { Filters, Filter } from '@/src/interfaces/Filters';

Vue.use(Vuex);

interface AppState {
  auth: string | null;
  refresh: string | null;
  user: User | null;
  provider: Provider | null;
  filters: Filters;
}

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
      [Filter.STAR_COUNT]: null,
      [Filter.OPEN_ISSUES_COUNT]: null,
      [Filter.FORKS_COUNT]: null,
      [Filter.PROGRAMMING_LANGUAGE]: null,
      [Filter.VERSION_CONTROL_SERVICE]: null,
      [Filter.CREATED_AT]: null,
      [Filter.UPDATED_AT]: null,
    },
  };
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
    state.provider = payload;
  },

  [MUTATIONS.SET_USER](state: AppState, user: User): void {
    state.user = user;
  },

  [MUTATIONS.SET_PROVIDER](state: AppState, provider: Provider): void {
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
 * Actions than calls the mutations to change state
 * Could be async
 */
export const actions: any = {
  async nuxtServerInit({ commit, dispatch }: any, { req }: any): Promise<void> {
    const authToken = req.cookies?.auth || null;

    commit(MUTATIONS.SET_AUTH, authToken);

    await dispatch('getUser', authToken);
  },

  async getUser(
    { commit }: any,
    accessToken = cookies.get('auth')
  ): Promise<void> {
    if (accessToken) {
      const user = await this.$axios.$get('user/', {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      });

      commit(MUTATIONS.SET_USER, user);
    }
  },
};
