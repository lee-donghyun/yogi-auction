import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { items as serverItems } from "../../data/items";

export type UseSearch = {
  items: Item.ListItem[];
  recommends: string[];
  query: string;
  onChange: (e: any) => void;
  onSubmit: (e: any) => void;
  isLoading: boolean;
  isEmpty: boolean;
  loadMore: () => void;
};

const useSearch = (): UseSearch => {
  const router = useRouter();

  const sp = new URLSearchParams(router.asPath.split("?")?.[1]);
  const [query, setQuery] = useState<string>(sp?.get("q") ?? "");
  const [recommends, setRecommends] = useState<string[]>([]);

  const [items, setItems] = useState<Item.ListItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const onChange = (e: any) => setQuery(e.target.value);
  const onSubmit = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: { ...router.query, q: query, n: Date.now() },
    });
  };

  const loadMore = () => {
    if (isLoading) {
      return;
    }
    if (page >= totalPage) {
      return;
    }
    if (typeof router.query.q === "string" && !!router.query?.q) {
      setIsLoading(true);
      getItem(router.query.q, page + 1)
        .then((res) => {
          setItems([...items, ...res.items]);
          setPage(res.page);
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (typeof router.query.q === "string" && !!router.query?.q) {
      setIsLoading(true);
      setIsEmpty(false);
      setItems([]);
      getItem(router.query.q, 1)
        .then((res) => {
          setItems(res.items);
          setTotalPage(res.totalPage);
          setIsEmpty(!res.count);
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }
  }, [router.query.n]);

  useEffect(() => {
    if (query) {
      getRecommend(query)
        .then((res) => setRecommends(res))
        .catch((err) => console.error(err));
    }
  }, [query]);

  return {
    items,
    recommends,
    query,
    onChange,
    onSubmit,
    isLoading,
    isEmpty,
    loadMore,
  };
};

const getItem = async (query: string, page: number): Promise<Item.List> => {
  await new Promise<void>((res) => setTimeout(res, 2000));
  const result = serverItems.sort(() => Math.random() - 0.5);
  return { items: result, count: 12, page, totalPage: 48 };
};

const getRecommend = async (query: string) => {
  return ["recomends", "related", "to", "query"];
};

export default useSearch;
