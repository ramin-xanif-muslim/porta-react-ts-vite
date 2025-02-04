import {
  AuthProvider as Auth2Provider,
  TAuthConfig,
  TRefreshTokenExpiredEvent,
} from "react-oauth2-code-pkce";

// const BASE_URL = "http://localhost:5173";
const BASE_URL = "https://app-vms-identity-test-cqfjgpfmdpfhd8cp.germanywestcentral-01.azurewebsites.net/";

const authConfig: TAuthConfig = {
  clientId: "vms-web",
  authorizationEndpoint: `${BASE_URL}/connect/authorize`,
  tokenEndpoint: `${BASE_URL}/connect/token`,
  redirectUri: `${BASE_URL}/`,
  scope: "vms-api",
  onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) =>
    event.logIn(undefined, undefined, "popup"),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <Auth2Provider authConfig={authConfig}>{children}</Auth2Provider>;
}
