import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  return auth;
};
