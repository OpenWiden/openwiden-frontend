import { Dispatch } from 'vuex';
import { Provider } from '@/src/interfaces/Provider';

function loginUser(vcs: Provider, baseURL: string, dispatch: Dispatch): void {
  const loginUrl = new URL(`auth/login/${vcs}/`, baseURL);

  dispatch('loginUser', { provider: vcs });

  if (vcs === Provider.GITLAB) {
    const redirectURI = `${window.location.origin}/auth/complete/${vcs}/`;

    loginUrl.searchParams.set('redirect_uri', redirectURI);
  }

  window.location.href = loginUrl.toString();
}

export default loginUser;
