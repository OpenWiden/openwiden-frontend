import { NuxtAxiosInstance } from '@nuxtjs/axios';
import services from '@/src/services';

import { UserData, User } from '@/src/interfaces/User/User';
import {
  AuthorizationTokensData,
  AuthorizationTokens,
} from '@/src/interfaces/AuthorizationTokens/AuthorizationTokens';
import authTokensResolver from '@/src/interfaces/AuthorizationTokens/resolver';
import { AppState } from '@/src/interfaces/AppState';

import userResolver from '@/src/interfaces/User/resolver';

interface Store {
  state: AppState;
}

export interface UserAPIMethods {
  getUser(authToken: string): Promise<User>;
  getRefreshedToken(refreshToken: string): Promise<string>;
  authorizeUser(code: string, state: string): Promise<AuthorizationTokens>;
}

export const userAPICreator = (
  $axios: NuxtAxiosInstance,
  store: Store
): UserAPIMethods => {
  const { $get, $post } = $axios;

  const {
    urls: { auth, user: userURL },
  } = services;

  return {
    getUser(authToken) {
      return $get<UserData>(userURL.me, {
        headers: {
          Authorization: `JWT ${authToken}`,
        },
      }).then(userResolver);
    },

    getRefreshedToken(refreshToken) {
      const access = $post(auth.tokenRefresh, {
        refresh: refreshToken,
      });

      return access;
    },

    authorizeUser(code, state) {
      return $get<AuthorizationTokensData>(
        `auth/complete/${store.state.provider}/?code=${code}&state=${state}`
      ).then(authTokensResolver);
    },
  };
};
