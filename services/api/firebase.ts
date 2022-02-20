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
  DocumentReference,
} from "firebase/firestore";
import { getToken, getUuid } from "../utils";
import dayjs from "dayjs";

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
  setDoc<User.User>(doc(db, "users", localId) as DocumentReference<User.User>, {
    id: localId,
    asks: [],
    bids: [],
    transaction: [],
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
  payload: {
    item: {
      id: string;
      name: string;
    };
    option: {
      id: string;
      name: string;
      price: number;
    };
  }
) => {
  const token = getToken();

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
                {
                  id: payload.option.id,
                  price: payload.option.price,
                  placer: token,
                },
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

export const deleteOption = async (
  option: "asks" | "bids",
  payload: User.Option
) => {
  const token = getToken();

  const userRef = doc(db, "users", token);
  const userSnap = await getDoc(userRef);
  const user = userSnap.data();
  await updateDoc(userRef, {
    [option]: user?.[option].filter(
      (option: User.Option) => option.option.id !== payload.option.id
    ),
  });

  const itemRef = doc(db, "items", payload.item.id);
  const itemSnap = await getDoc(itemRef);
  const item = itemSnap.data();
  await updateDoc(itemRef, {
    [option]: item?.[option]?.map((_option: Item.Option) =>
      _option.name === payload.option.name
        ? {
            name: _option.name,
            options: _option.options.filter(
              (__option) => __option.id !== payload.option.id
            ),
          }
        : _option
    ),
  });

  if (option === "asks" && payload.option.price === item?.lowestAsk) {
    const updatedItem = (await getDoc(itemRef)).data();
    await updateDoc(itemRef, {
      lowestAsk:
        updatedItem?.asks
          .flatMap((ask: Item.Option) => ask.options)
          .sort((a: any, b: any) => a.price - b.price)?.[0]?.price ?? null,
    });
  }
};

export const addTransaction = async (
  option: "sell" | "buy",
  payload: User.Option
) => {
  const token = getToken();
  const transactionId = getUuid();
  const createdAt = dayjs().format("YYYY/MM/DD HH:mm");

  const transactionRef = doc(db, "transaction", transactionId);
  await setDoc(transactionRef, {
    ...payload,
    buyer: option === "sell" ? payload.option.placer : token,
    seller: option === "buy" ? payload.option.placer : token,
    open: false,
    payment: false,
    shipping: false,
    shippingNumber: false,
    createdAt,
  });

  const userRef = doc(db, "users", token);
  await updateDoc(userRef, {
    transaction: arrayUnion({
      item: payload.item,
      id: transactionId,
      createdAt,
    }),
  });

  const placerRef = doc(db, "users", payload.option.placer);
  await updateDoc(placerRef, {
    transaction: arrayUnion({
      item: payload.item,
      id: transactionId,
      createdAt,
    }),
  });
};

export const getUser = async (): Promise<any> => {
  const token = getToken();

  const userRef = doc(db, "users", token);
  const user = await getDoc(userRef);
  return user.data();
};

export const getTransactions = async (): Promise<any> => {
  const token = getToken();

  const q = query(collection(db, "transaction"));
  const transactionSnaps = await getDocs(q);
  return transactionSnaps.docs.map((doc) => doc.data());
};
