import axios from "axios";

const securetoken = axios.create({
  baseURL: "https://securetoken.googleapis.com",
});

securetoken.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      key: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    };
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export const postExchangeRefreshTokenForIdToken = async (
  refreshToken: string
) => {
  const params = new URLSearchParams();
  params.append("refresh_token", refreshToken);
  params.append("grant_type", "refresh_token");
  return securetoken.post<{
    expires_in: string;
    token_type: string;
    refresh_token: string;
    id_token: string;
    user_id: string;
    project_id: string;
  }>(`/v1/token`, params);
};
