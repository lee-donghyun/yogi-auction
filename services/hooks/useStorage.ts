import { useEffect, useState } from "react";

const useStorage = <T extends { [key: string]: any }>(
  storage: "sessionStorage" | "localStorage" = "localStorage"
): [
  (key: keyof T) => NonNullable<T>[keyof T] | undefined,
  (payload: Partial<T>) => void
] => {
  const [data, setData] = useState<Partial<T>>({});

  const selector = (key: keyof T) => data?.[key];

  const dispatch = (payload: Partial<T>) =>
    setData((p) => ({ ...p, ...payload }));

  useEffect(() => {
    setData(JSON.parse(window[storage].getItem("USE_STORAGE") ?? "{}"));
  }, []);

  useEffect(() => {
    data && window[storage].setItem("USE_STORAGE", JSON.stringify(data));
  }, [data]);

  return [selector, dispatch];
};

export default useStorage;
