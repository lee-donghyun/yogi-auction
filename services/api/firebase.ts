import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  collection,
  query,
  startAfter,
  limit,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  updateDoc,
  arrayUnion,
  DocumentReference,
  CollectionReference,
  where,
} from "firebase/firestore";
import { getToken, getUuid } from "../utils";
import dayjs from "dayjs";
import { DAYJS_FORMAT } from "../../data";

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

export const addUser = async (
  localId: string,
  payload: {
    address: string;
    bankAccount: string;
  }
) => {
  const userRef = doc(db, "users", localId) as DocumentReference<User.User>;

  await setDoc<User.User>(userRef, {
    id: localId,
    asks: [],
    bids: [],
    transactions: [],
    address: payload.address,
    bankAccount: payload.bankAccount,
  });
};

export const registerItem = async (_payload: Item.Register) => {
  const itemId = getUuid();
  const payload = {
    asks: [],
    bids: [],
    like: 0,
    lowestAsk: null,
    releasedAt: dayjs().format(DAYJS_FORMAT),
    sold: 0,
    view: 0,
    ..._payload,
    id: itemId,
    state: "REQUESTED",
  };
  await setDoc<Item.Item>(
    doc(db, "requests", itemId) as DocumentReference<Item.Item>,
    payload
  );
  return payload;
};

export const PAGE_SIZE = 24;
export const getItems = async (
  bookmark: QueryDocumentSnapshot<DocumentData> | "INITIAL_REQUEST"
) => {
  const itemsRef = collection(db, "items") as CollectionReference<Item.Item>;
  const q =
    bookmark === "INITIAL_REQUEST"
      ? query<Item.Item>(itemsRef, limit(PAGE_SIZE))
      : query<Item.Item>(itemsRef, startAfter(bookmark), limit(PAGE_SIZE));
  const itemsSnap = await getDocs(q);
  return {
    bookmark: itemsSnap.docs[itemsSnap.docs.length - 1],
    data: itemsSnap.docs.map((doc) => doc.data()),
  };
};

export const getQueriedItems = async (key: {
  bookmark: QueryDocumentSnapshot<DocumentData> | "INITIAL_REQUEST";
  query?: string;
}) => {
  const itemsRef = collection(db, "items") as CollectionReference<Item.Item>;
  const q =
    key.bookmark === "INITIAL_REQUEST"
      ? query<Item.Item>(
          itemsRef,
          limit(PAGE_SIZE),
          where("name", "==", key.query)
        )
      : query<Item.Item>(
          itemsRef,
          startAfter(key.bookmark),
          limit(PAGE_SIZE),
          where("name", "==", key.query)
        );
  const itemsSnap = await getDocs(q);
  return {
    bookmark: itemsSnap.docs[itemsSnap.docs.length - 1],
    data: itemsSnap.docs.map((doc) => doc.data()),
  };
};

export const getItem = async (id: string): Promise<{ data: Item.Item }> => {
  const docRef = doc(db, "items", id) as DocumentReference<Item.Item>;
  const docSnap = await getDoc<Item.Item>(docRef);
  if (!docSnap.exists()) {
    throw new Error("no data exist");
  } else {
    return { data: docSnap.data() };
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
      option === "asks" && payload.option.price < (item?.lowestAsk ?? Infinity)
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
  const createdAt = dayjs().format(DAYJS_FORMAT);

  const transactionRef = doc(
    db,
    "transactions",
    transactionId
  ) as DocumentReference<Transaction.Transaction>;
  await setDoc<Transaction.Transaction>(transactionRef, {
    ...payload,
    buyer: option === "sell" ? payload.option.placer : token,
    seller: option === "buy" ? payload.option.placer : token,
    open: false,
    shippingNumber: false,
    createdAt,
    payedAt: null,
    sentAt: null,
    arrivedAt: null,
  });

  const userRef = doc(db, "users", token);
  await updateDoc(userRef, {
    transactions: arrayUnion({
      item: payload.item,
      id: transactionId,
      createdAt,
    }),
  });

  const placerRef = doc(db, "users", payload.option.placer);
  await updateDoc(placerRef, {
    transactions: arrayUnion({
      item: payload.item,
      id: transactionId,
      createdAt,
    }),
  });
};

export const getUser = async (key: string) => {
  const userId = key === "/myinfo" ? getToken() : key;
  const userRef = doc(db, "users", userId) as DocumentReference<User.User>;
  const user = await getDoc<User.User>(userRef);
  if (!user.exists()) {
    throw new Error("data does not exist");
  }
  return user.data();
};

export const updateUser = async (payload: Partial<User.User>) => {
  const token = getToken();
  const userRef = doc(db, "users", token) as DocumentReference<User.User>;
  await updateDoc(userRef, payload);
};

export const getTransaction = async (id: string) => {
  const transactionRef = doc(
    db,
    "transactions",
    id
  ) as DocumentReference<Transaction.Transaction>;
  const transactionSnap = await getDoc(transactionRef);
  if (!transactionSnap.exists()) {
    throw new Error("transaction data does not exist");
  }
  return transactionSnap.data();
};

export const updateTransaction = async (
  id: string,
  payload: Partial<Transaction.Transaction>
) => {
  const transactionRef = doc(
    db,
    "transactions",
    id
  ) as DocumentReference<Transaction.Transaction>;
  await updateDoc(transactionRef, payload);
};
