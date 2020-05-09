import { Context } from '@nuxt/types';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import config from '@/config';

import { UserData, User } from '@/src/interfaces/User/User';
import {
  AuthorizationTokensData,
  AuthorizationTokens,
} from '@/src/interfaces/AuthorizationTokens/AuthorizationTokens';
import authTokensResolver from '@/src/interfaces/AuthorizationTokens/resolver';
import { AppState } from '@/src/interfaces/AppState';
import {
  RepositoriesData,
  Repositories,
} from '@/src/interfaces/Repositories/Repositories';
import userResolver from '@/src/interfaces/User/resolver';
import repositoryResolver from '@/src/interfaces/Repository/resolver';
import { ProgrammingLanguage } from '@/src/interfaces/ProgrammingLanguage';

import setFiltersQueryParams from '@/src/lib/setFiltersQueryParams';

interface Store {
  state: AppState;
}

const apiCreator = ($axios: NuxtAxiosInstance, store: Store) => ({
  getUser(authToken: string): Promise<User> {
    const user = $axios.$get<UserData>(config.urls.user, {
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

    setFiltersQueryParams(url, filters);

    return $axios.$get<RepositoriesData>(url.href).then((data) => ({
      ...data,
      results: data.results.map(repositoryResolver),
    }));
  },

  getProgrammingLanguages(): Promise<ProgrammingLanguage[]> {
    return $axios.$get<ProgrammingLanguage[]>(config.urls.programmingLanguages);
  },

  authorizeUser(code: string, state: string): Promise<AuthorizationTokens> {
    return $axios
      .$get<AuthorizationTokensData>(
        `auth/complete/${store.state.provider}/?code=${code}&state=${state}`
      )
      .then(authTokensResolver);
  },
});

export default ({ $axios, store }: Context, inject: any) => {
  inject('api', apiCreator($axios, store));
};
