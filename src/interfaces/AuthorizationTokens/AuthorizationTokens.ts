export interface AuthorizationTokensData {
  detail: { access: string; refresh: string };
}

export interface AuthorizationTokens {
  authToken: string;
  refreshToken: string;
}
