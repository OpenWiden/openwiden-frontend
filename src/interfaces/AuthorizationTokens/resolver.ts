import {
  AuthorizationTokensData,
  AuthorizationTokens,
} from './AuthorizationTokens';

export default function authTokensResolver({
  access,
  refresh,
}: AuthorizationTokensData): AuthorizationTokens {
  return {
    authToken: access,
    refreshToken: refresh,
  };
}
