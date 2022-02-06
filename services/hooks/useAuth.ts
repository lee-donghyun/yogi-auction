import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { postExchangeRefreshTokenForIdToken } from "../api/securetoken";
import { authState } from "../store";
import useStorage from "./useStorage";
export const useAuth = (): [
  null | boolean,
  (refreshToken?: string) => Promise<boolean | null>,
  () => void
] => {
  const [isAuthorized, setIsAuthorized] = useRecoilState(authState);
  const [selector, dispatch, isInitialized] =
    useStorage<{ auth: Partial<Auth.data> }>();

  const load = async (refreshToken = selector("auth")?.refreshToken ?? "") => {
    try {
      setIsAuthorized(null);
      const { data } = await postExchangeRefreshTokenForIdToken(refreshToken);
      dispatch({
        auth: {
          ...selector("auth"),
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
        },
      });
      setIsAuthorized(true);
      return true;
    } catch (error) {
      setIsAuthorized(false);
      dispatch({ auth: {} });
      return false;
    }
  };

  const clear = () => {
    dispatch({ auth: {} });
    setIsAuthorized(false);
  };

  useEffect(() => {
    if (isAuthorized === null && isInitialized) {
      load();
    }
  }, [isInitialized]);
  return [isAuthorized, load, clear];
};
