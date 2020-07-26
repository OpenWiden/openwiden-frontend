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
import {
  RepositoryData,
  Repository,
} from '@/src/interfaces/Repository/Repository';
import userResolver from '@/src/interfaces/User/resolver';
import repositoryResolver from '@/src/interfaces/Repository/resolver';
import { ProgrammingLanguage } from '@/src/interfaces/ProgrammingLanguage';
import { FetchingDataWithPagination } from '@/src/interfaces/FetchingDataWithPagination';
import { IssueData, Issue } from '@/src/interfaces/Issue/Issue';
import issueResolver from '@/src/interfaces/Issue/resolver';

import setFiltersQueryParams from '@/src/lib/setFiltersQueryParams';

interface Store {
  state: AppState;
}

const {
  urls: {
    auth,
    user: userURL,
    repositories: repositoriesURL,
    programmingLanguages,
  },
} = config;

interface APIMethods {
  getUser(authToken: string): Promise<User>;
  getUserRepositories(): Promise<Repositories>;
  addUserRepository(id: string): Promise<void>;
  removeUserRepository(id: string): Promise<void>;
  getRefreshedToken(refreshToken: string): Promise<string>;
  getRepositories(): Promise<Repositories>;
  getRepository(id: string): null | Promise<Repository>;
  getRepositoryIssues(
    id: string,
    url?: string | undefined
  ): null | Promise<FetchingDataWithPagination<Issue>>;
  getProgrammingLanguages(): Promise<ProgrammingLanguage[]>;
  authorizeUser(code: string, state: string): Promise<AuthorizationTokens>;
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: APIMethods;
  }
}

const apiCreator = ($axios: NuxtAxiosInstance, store: Store): APIMethods => {
  const { $get, $post, $delete } = $axios;
  const headers = {
    Authorization: `JWT ${store.state.auth}`,
  };

  return {
    getUser(authToken: string): Promise<User> {
      const user = $get<UserData>(userURL.me, {
        headers: {
          Authorization: `JWT ${authToken}`,
        },
      });

      return user.then(userResolver);
    },

    getUserRepositories(): Promise<Repositories> {
      return $get<RepositoriesData>(userURL.repositories, {
        headers,
      }).then((data) => ({
        ...data,
        results: data.results.map(repositoryResolver),
      }));
    },

    addUserRepository(id: string): Promise<void> {
      const url = `${userURL.repositories}${id}/add/`;

      return $post<void>(url, null, {
        headers,
      });
    },

    removeUserRepository(id: string): Promise<void> {
      const url = `${userURL.repositories}${id}/remove/`;

      return $delete<void>(url, {
        headers,
      });
    },

    getRefreshedToken(refreshToken: string): Promise<string> {
      const access = $post(auth.tokenRefresh, {
        refresh: refreshToken,
      });

      return access;
    },

    getRepositories(): Promise<Repositories> {
      const { filters } = store.state;
      const url = new URL(repositoriesURL, $axios.defaults.baseURL);

      setFiltersQueryParams(url, filters);

      return $get<RepositoriesData>(url.href).then((data) => ({
        ...data,
        results: data.results.map(repositoryResolver),
      }));
    },

    getRepository(id: string): null | Promise<Repository> {
      if (!id) return null;

      return $axios
        .$get<RepositoryData>(repositoriesURL + id)
        .then(repositoryResolver);
    },

    getRepositoryIssues(
      id: string,
      url?: string | null
    ): null | Promise<FetchingDataWithPagination<Issue>> {
      if (!id) return null;

      const baseUrl = url || `${repositoriesURL}${id}/issues`;

      return $get<FetchingDataWithPagination<IssueData>>(baseUrl).then(
        (data) => ({
          ...data,
          results: data.results.map(issueResolver),
        })
      );
    },

    getProgrammingLanguages(): Promise<ProgrammingLanguage[]> {
      return $get<ProgrammingLanguage[]>(programmingLanguages);
    },

    authorizeUser(code: string, state: string): Promise<AuthorizationTokens> {
      return $get<AuthorizationTokensData>(
        `auth/complete/${store.state.provider}/?code=${code}&state=${state}`
      ).then(authTokensResolver);
    },
  };
};

export default ({ $axios, store }: Context, inject: any) => {
  inject('api', apiCreator($axios, store));
};
