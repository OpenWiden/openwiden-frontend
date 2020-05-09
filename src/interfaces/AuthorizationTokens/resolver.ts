import {
  AuthorizationTokensData,
  AuthorizationTokens,
} from './AuthorizationTokens';

export default function authTokensResolver({
  detail: { access, refresh },
}: AuthorizationTokensData): AuthorizationTokens {
  return {
    authToken: access,
    refreshToken: refresh,
  };
}
