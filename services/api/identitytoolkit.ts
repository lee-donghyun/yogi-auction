import axios from "axios";
import { addUser } from "./firebase";

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
  const data = await identitytoolkit.post<Auth.data>(`/v1/accounts:signUp`, {
    ...form,
    returnSecureToken: true,
  });
  await addUser(data.data.localId);
  return data;
};

export const postEmailSingIn = async (form: {
  email: string;
  password: string;
}) => {
  return identitytoolkit.post<Auth.data>(`/v1/accounts:signInWithPassword`, {
    ...form,
    returnSecureToken: true,
  });
};
