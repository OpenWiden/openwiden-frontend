import { Context } from '@nuxt/types';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import config from '@/config';

import { User } from '@/src/interfaces/User/User';
import { AuthorizationTokens } from '@/src/interfaces/AuthorizationTokens';
import { Filter } from '@/src/interfaces/Filters';
import { AppState } from '@/src/interfaces/AppState';
import { ProgrammingLanguage } from '@/src/interfaces/ProgrammingLanguage';
import { Repositories } from '@/src/interfaces/Repositories/Repositories';
import userResolver from '@/src/interfaces/User/resolver';
import repositoryResolver from '@/src/interfaces/Repository/resolver';

import { getObjectKeys } from '@/src/lib/getObjectKeys';

interface Store {
  state: AppState;
}

const apiCreator = ($axios: NuxtAxiosInstance, store: Store) => ({
  getUser(authToken: string): Promise<User> {
    const user = $axios.$get(config.urls.user, {
      headers: {
        Authorization: `JWT ${authToken}`,
      },
    });

    return user.then(userResolver);
  },

  getRefreshedToken(refreshToken: string): Promise<string> {
    const { urls } = config;
    const access = $axios.$post(urls.auth.tokenRefresh, {
      refresh: refreshToken,
    });

    return access;
  },

  getRepositories(): Promise<Repositories> {
    const { urls } = config;
    const { filters } = store.state;
    const url = new URL(urls.repositories, $axios.defaults.baseURL);

    if (filters) {
      getObjectKeys(filters).forEach((filter) => {
        let filterValue = filters[filter];

        if (!filterValue) return;

        if (filter === Filter.PROGRAMMING_LANGUAGE) {
          filterValue = (filterValue as ProgrammingLanguage).id;
        }

        url.searchParams.set(String(filter).toLowerCase(), String(filterValue));
      });
    }

    return $axios.$get(url.href).then((data) => ({
      ...data,
      results: data.results.map(repositoryResolver),
    }));
  },

  authorizeUser(code: string, state: string): Promise<AuthorizationTokens> {
    return $axios.$get(`auth/complete/github/?code=${code}&state=${state}`);
  },

  getProgrammingLanguages(): Promise<any> {
    return $axios.$get(config.urls.programmingLanguages);
  },
});

export default ({ $axios, store }: Context, inject: any) => {
  inject('api', apiCreator($axios, store));
};
