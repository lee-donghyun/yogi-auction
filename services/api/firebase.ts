import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
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

export const registerItem = async (_payload: Item.Register) => {
  const itemId = getUuid();
  const payload = {
    asks: [],
    bids: [],
    like: 0,
    lowestAsk: null,
    releasedAt: Date.now(),
    sold: 0,
    view: 0,
    ..._payload,
    id: itemId,
  };
  await setDoc(doc(db, "items", itemId), payload);
  return payload;
};

export const PAGE_SIZE = 24;
export const getItems = async (
  bookmark: QueryDocumentSnapshot<DocumentData> | "INITIAL_REQUEST"
): Promise<{
  bookmark: QueryDocumentSnapshot<DocumentData> | null;
  data: Item.Item[];
}> => {
  const q =
    bookmark === "INITIAL_REQUEST"
      ? query(collection(db, "items"), limit(PAGE_SIZE))
      : query(collection(db, "items"), startAfter(bookmark), limit(PAGE_SIZE));
  const documentSnapshots = await getDocs(q);
  return {
    bookmark: documentSnapshots.docs[documentSnapshots.docs.length - 1],
    data: documentSnapshots.docs.map((doc) => doc.data()) as any,
  };
};

export const getItem = async (id: string): Promise<{ data: Item.Item }> => {
  const docRef = doc(db, "items", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error("no data exist");
  } else {
    return { data: docSnap.data() as Item.Item };
  }
};

export const placeOption = async (
  option: "asks" | "bids",
  payload: User.Option
) => {
  const token = JSON.parse(localStorage.getItem("USE_STORAGE") ?? "{}")?.auth
    ?.localId;

  const userRef = doc(db, "users", token);
  await updateDoc(userRef, { [option]: arrayUnion(payload) });

  const itemRef = doc(db, "items", payload.item.id);
  const itemSnap = await getDoc(itemRef);
  const item = itemSnap.data();
  await updateDoc(itemRef, {
    [option]: item?.[option]?.map(
      (_option: Item.Option): Item.Option =>
        _option.name == payload.option.name
          ? {
              name: payload.option.name,
              options: [
                ..._option.options,
                { id: payload.option.id, price: payload.option.price },
              ].sort((a, b) =>
                option === "asks" ? a.price - b.price : b.price - a.price
              ),
            }
          : _option
    ),
    lowestAsk:
      option === "asks" && payload.option.price < item?.lowestAsk
        ? payload.option.price
        : item?.lowestAsk,
  });
};
