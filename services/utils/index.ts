import { getItem } from "../api/firebase";

export const getUuid = () => {
  return "xxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0;
    let v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const formatPrice = (price: number) => `₩${price.toLocaleString()}`;

export const getToken = (): string =>
  JSON.parse(localStorage.getItem("USE_STORAGE") ?? "{}")?.auth?.localId;

export const getParams = (asPath: string, key: string) => {
  const sp = new URLSearchParams(asPath.split("?")?.[1]);
  return sp.get(key);
};

export const getItemQuery = (key: string) =>
  getItem(key).then((res) => res.data);
