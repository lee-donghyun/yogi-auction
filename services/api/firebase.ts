import axios from "axios";

const identitytoolkit = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com",
});

identitytoolkit.interceptors.request.use(
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

export const postEmailSignUp = async (form: {
  email: string;
  password: string;
}) => {
  return identitytoolkit.post<{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
  }>(`/v1/accounts:signUp`, {
    ...form,
    returnSecureToken: true,
  });
};
