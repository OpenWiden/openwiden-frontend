import { Dispatch } from 'vuex';
import { Provider } from '@/src/interfaces/Provider';

function loginUser(vsc: Provider, baseURL: string, dispatch: Dispatch): void {
  const loginUrl = new URL(`auth/login/${vsc}/`, baseURL);

  dispatch('loginUser', { provider: vsc });

  const redirectURI = `${window.location.href}auth/complete/${vsc}/`;

  loginUrl.searchParams.set('redirect_uri', redirectURI);

  window.location.href = loginUrl.toString();
}

export default loginUser;
