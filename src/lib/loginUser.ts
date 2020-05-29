import { Dispatch } from 'vuex';
import { Provider } from '@/src/interfaces/Provider';

export function loginUser(
  provider: Provider,
  baseUrl: string,
  dispatch: Dispatch
) {
  const loginUrl = new URL(`auth/login/${provider}/`, baseUrl);

  dispatch('loginUser', { provider });

  loginUrl.searchParams.set('redirect_uri', window.location.href);

  window.location.href = loginUrl.toString();
}
