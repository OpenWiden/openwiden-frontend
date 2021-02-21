import { Context } from '@nuxt/types';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { userAPICreator, UserAPIMethods } from '../api/userAPI';
import {
  repositoriesAPICreator,
  RepositoriesAPIMethods,
} from '../api/reposAPI';

import { AppState } from '@/src/interfaces/AppState';

interface Store {
  state: AppState;
}

interface APIMethods extends RepositoriesAPIMethods, UserAPIMethods {}

declare module 'vue/types/vue' {
  interface Vue {
    $api: APIMethods;
  }
}

const apiCreator = ($axios: NuxtAxiosInstance, store: Store): APIMethods => {
  const reposAPI = repositoriesAPICreator($axios, store);
  const userAPI = userAPICreator($axios, store);

  return {
    ...reposAPI,
    ...userAPI,
  };
};

export default ({ $axios, store }: Context, inject: any) => {
  inject('api', apiCreator($axios, store));
};
