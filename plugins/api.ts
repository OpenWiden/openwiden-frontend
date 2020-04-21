import config from '@/config';
import { User } from '@/src/interfaces/User';

const apiCreator = ($axios: any) => ({
  getUser(authToken: string): Promise<User> {
    const user = $axios.$get(config.urls.user, {
      headers: {
        Authorization: `JWT ${authToken}`,
      },
    });

    return user;
  },

  getRefreshedToken(refreshToken: string): Promise<string> {
    const { urls } = config;
    const access = $axios.$post(urls.auth.tokenRefresh, {
      refresh: refreshToken,
    });

    return access;
  },

  authorizeUser(code: string, state: string): Promise<any> {
    return $axios.$get(`auth/complete/github/?code=${code}&state=${state}`);
  },
});

export default ({ $axios }: any, inject: any) => {
  inject('api', apiCreator($axios));
};