import { atom } from "recoil";

export const authState = atom<null | boolean>({
  key: "authState",
  default: null,
});
