import { useEffect, useState } from "react";

const useStorage = <T extends { [key: string]: any }>(
  storage: "sessionStorage" | "localStorage" = "localStorage"
): [
  (key: keyof T) => NonNullable<T>[keyof T] | undefined,
  (payload: Partial<T>) => void,
  boolean
] => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [data, setData] = useState<Partial<T>>({});

  const selector = (key: keyof T) => data?.[key];

  const dispatch = (payload: Partial<T>) => {
    setData({ ...data, ...payload });
    window[storage].setItem(
      "USE_STORAGE",
      JSON.stringify({ ...data, ...payload })
    );
  };

  useEffect(() => {
    setData(JSON.parse(window[storage].getItem("USE_STORAGE") ?? "{}"));
    setIsInitialized(true);
  }, []);

  return [selector, dispatch, isInitialized];
};

export default useStorage;
