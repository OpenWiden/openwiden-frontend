import { NuxtAxiosInstance } from '@nuxtjs/axios';
import config from '@/config';

import { AppState } from '@/src/interfaces/AppState';
import {
  RepositoriesData,
  Repositories,
  UserRepositoriesData,
  UserRepositories,
} from '@/src/interfaces/Repositories/Repositories';
import {
  RepositoryData,
  Repository,
} from '@/src/interfaces/Repository/Repository';
import repositoryResolver from '@/src/interfaces/Repository/resolver';
import userRepositoryResolver from '@/src/interfaces/UserRepository/resolver';
import { ProgrammingLanguage } from '@/src/interfaces/ProgrammingLanguage';
import { FetchingDataWithPagination } from '@/src/interfaces/FetchingDataWithPagination';
import { IssueData, Issue } from '@/src/interfaces/Issue/Issue';
import { Filters } from '@/src/interfaces/Filters';
import issueResolver from '@/src/interfaces/Issue/resolver';

import setFiltersQueryParams from '@/src/lib/setFiltersQueryParams';

interface Store {
  state: AppState;
}

export interface RepositoriesAPIMethods {
  getUserRepositories(): Promise<UserRepositories>;
  addUserRepository(id: string): Promise<void>;
  removeUserRepository(id: string): Promise<void>;
  getRepositories(filtersState?: Filters): Promise<Repositories>;
  getRepository(id: string): null | Promise<Repository>;
  getRepositoryIssues(
    id: string,
    url?: string | undefined
  ): null | Promise<FetchingDataWithPagination<Issue>>;
  getProgrammingLanguages(): Promise<ProgrammingLanguage[]>;
}

export const repositoriesAPICreator = (
  $axios: NuxtAxiosInstance,
  store: Store
): RepositoriesAPIMethods => {
  const { $get, $post, $delete } = $axios;

  const {
    urls: {
      user: userURL,
      repositories: repositoriesURL,
      programmingLanguages,
    },
  } = config;

  return {
    getUserRepositories() {
      return $get<UserRepositoriesData>(userURL.repositories, {
        headers: { Authorization: `JWT ${store.state.auth}` },
      }).then((data) => ({
        ...data,
        results: data.results.map(userRepositoryResolver),
      }));
    },

    addUserRepository(id) {
      const url = `${userURL.repositories}${id}/add/`;

      return $post<void>(url, null, {
        headers: { Authorization: `JWT ${store.state.auth}` },
      });
    },

    removeUserRepository(id) {
      const url = `${userURL.repositories}${id}/remove/`;

      return $delete<void>(url, {
        headers: { Authorization: `JWT ${store.state.auth}` },
      });
    },

    getRepositories(filtersState) {
      const url = new URL(repositoriesURL, $axios.defaults.baseURL);

      if (filtersState) {
        setFiltersQueryParams(url, filtersState);
      }

      return $get<RepositoriesData>(url.href).then((data) => ({
        ...data,
        results: data.results.map(repositoryResolver),
      }));
    },

    getRepository(id) {
      if (!id) return null;

      return $axios
        .$get<RepositoryData>(repositoriesURL + id)
        .then(repositoryResolver);
    },

    getRepositoryIssues(id, url) {
      if (!id) return null;

      const baseUrl = url || `${repositoriesURL}${id}/issues`;

      return $get<FetchingDataWithPagination<IssueData>>(baseUrl).then(
        (data) => ({
          ...data,
          results: data.results.map(issueResolver),
        })
      );
    },

    getProgrammingLanguages() {
      return $get<ProgrammingLanguage[]>(programmingLanguages);
    },
  };
};
