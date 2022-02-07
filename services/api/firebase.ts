import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getUuid } from "../utils";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "yogi-auction.firebaseapp.com",
  projectId: "yogi-auction",
  storageBucket: "yogi-auction.appspot.com",
  appId: "1:177114118932:web:7360a5c9ea80742e5de001",
});

const storage = getStorage(app);

export const uploadFile = async (file: File, Authorization: string) => {
  const imageRef = ref(storage, `images/${getUuid()}`);
  await uploadBytes(imageRef, file, {
    customMetadata: { Authorization },
  });
  return await getDownloadURL(imageRef);
};
