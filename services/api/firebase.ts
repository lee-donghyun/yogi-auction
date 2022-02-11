import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getUuid } from "../utils";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "yogi-auction.firebaseapp.com",
  projectId: "yogi-auction",
  storageBucket: "yogi-auction.appspot.com",
  appId: "1:177114118932:web:7360a5c9ea80742e5de001",
});

const storage = getStorage(app);
const db = getFirestore(app);

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

export const addUser = (localId: string) =>
  setDoc(doc(db, "users", localId), {
    id: localId,
    asks: [],
    bids: [],
    buying: [],
    selling: [],
  });

export const registerItem = (payload: Item.Register) => {
  const itemId = getUuid();
  return setDoc(doc(db, "items", itemId), {
    asks: [],
    bids: [],
    id: itemId,
    like: 0,
    lowestAsk: null,
    releasedAt: Date.now(),
    sold: 0,
    view: 0,
    ...payload,
  });
};
