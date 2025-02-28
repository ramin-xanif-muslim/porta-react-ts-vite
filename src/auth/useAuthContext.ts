import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";

export const useAuthContext = () => {
  const auth = useContext(AuthContext);
  const handleLogOut = () => {
    localStorage.clear();
    sessionStorage.clear();

    auth.logOut();

    const authUrl = import.meta.env.VITE_AUTH_URL;
    const postLogoutRedirectUri = encodeURIComponent(
      import.meta.env.VITE_REDIRECT_URI,
    );
    const idTokenHint = auth.token;

    const logoutUrl = `${authUrl}/connect/logout?id_token_hint=${idTokenHint}&post_logout_redirect_uri=${postLogoutRedirectUri}`;

    window.location.href = logoutUrl;
  };
  return { ...auth, handleLogOut };
};
