import {
  AuthProvider as Auth2Provider,
  TAuthConfig,
  AuthContext,
} from "react-oauth2-code-pkce";
import { useContext } from "react";

const authConfig: TAuthConfig = {
  clientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
  authorizationEndpoint: `${import.meta.env.VITE_AUTH_URL}/connect/authorize`,
  tokenEndpoint: `${import.meta.env.VITE_AUTH_URL}/connect/token`,
  redirectUri: `${import.meta.env.VITE_HOST_URL}`,
  scope: import.meta.env.VITE_OAUTH_SCOPE,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <Auth2Provider authConfig={authConfig}>{children}</Auth2Provider>;
}

export const useToken = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  return auth;
};
