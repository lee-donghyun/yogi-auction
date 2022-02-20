import { DependencyList, useLayoutEffect, useRef, useState } from "react";

const useClientMemo = <T>(
  factory: () => T,
  deps: DependencyList | undefined
) => {
  const [value, setValue] = useState<T | null>(null);
  useLayoutEffect(() => {
    setValue(factory());
  }, deps);
  return value;
};

export default useClientMemo;
