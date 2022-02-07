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

export const uploadFile = async (file: File) => {
  const imageRef = ref(storage, `images/${getUuid()}`);
  await uploadBytes(imageRef, file, {
    customMetadata: {
      Authorization: JSON.parse(localStorage.getItem("USE_STORAGE") ?? "{}")
        ?.auth?.idToken,
    },
  });
  return await getDownloadURL(imageRef);
};
