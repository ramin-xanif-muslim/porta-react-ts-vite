import {
  AuthProvider as Auth2Provider,
  TAuthConfig,
  AuthContext,
} from "react-oauth2-code-pkce";
import { useContext } from "react";

const BASE_URL = "http://localhost:5173";
const AUTH_URL =
  "https://app-vms-identity-test-cqfjgpfmdpfhd8cp.germanywestcentral-01.azurewebsites.net";

const authConfig: TAuthConfig = {
  clientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
  authorizationEndpoint: `${AUTH_URL}/connect/authorize`,
  tokenEndpoint: `${AUTH_URL}/connect/token`,
  redirectUri: `${BASE_URL}`,
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
