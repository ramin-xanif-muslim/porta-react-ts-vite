import {
  AuthProvider as Auth2Provider,
  TAuthConfig,
} from "react-oauth2-code-pkce";

const authConfig: TAuthConfig = {
  clientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
  authorizationEndpoint: `${import.meta.env.VITE_AUTH_URL}/connect/authorize`,
  tokenEndpoint: `${import.meta.env.VITE_AUTH_URL}/connect/token`,
  redirectUri: `${import.meta.env.VITE_REDIRECT_URI}`,
  scope: import.meta.env.VITE_OAUTH_SCOPE,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <Auth2Provider authConfig={authConfig}>{children}</Auth2Provider>;
}
