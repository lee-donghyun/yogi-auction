import { useRef, useState, useEffect } from "react";

export const useObserver = (onObserve: () => any) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const node = observerRef.current;
    const observer = new IntersectionObserver(([entry]) => setEntry(entry));
    if (node) {
      observer.observe(node);
    }
    return () => observer.disconnect();
  }, [observerRef?.current]);

  useEffect(() => {
    if (entry?.isIntersecting) {
      onObserve();
    }
  }, [entry?.isIntersecting]);

  return observerRef;
};
