import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { items as serverItems } from "../../data/items";
import useStorage from "./useStorage";
import useSWRInfinite from "swr/infinite";
import { getQueriedItems, PAGE_SIZE } from "../api/firebase";
import { getParams } from "../utils";

export type UseSearch = {
  items: Item.Item[];
  recommends: string[];
  query: string;
  onChange: (e: any) => void;
  onSubmit: (e: any) => void;
  isLoading: boolean;
  isReachingEnd: boolean;
  isEmpty: boolean;
  loadMore: () => void;
  useRecentKeywords: [
    string[] | undefined,
    (keyword: string, contain?: boolean) => void
  ];
};

const getKey = (query: string | null) => (index: any, prevData: any) =>
  query
    ? {
        bookmark: index ? prevData.bookmark : "INITIAL_REQUEST",
        query,
      }
    : null;

const useSearch = (): UseSearch => {
  const router = useRouter();
  const [selector, dispatch] = useStorage<{ recentKeywords: string[] }>();

  const queryParams = getParams(router.asPath, "q");
  const [query, setQuery] = useState<string>(queryParams ?? "");
  const [recommends, setRecommends] = useState<string[]>([]);

  const { data, error, size, setSize } = useSWRInfinite(
    getKey(queryParams),
    getQueriedItems
  );
  const items = data?.flatMap(({ data }) => data) ?? [];
  const isLoading =
    !!queryParams &&
    (!data || (size > 0 && data && typeof data[size - 1] === "undefined"));
  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd =
    isEmpty || !!(data && data[data.length - 1]?.data?.length < PAGE_SIZE);

  const recentKeywords = selector("recentKeywords");
  const dispatchRecentKeywords = (keyword: string, contain: boolean = true) =>
    dispatch({
      recentKeywords: [
        ...(contain ? [keyword] : []),
        ...(recentKeywords ?? []).filter((_keyword) => keyword !== _keyword),
      ],
    });

  const onChange = (e: any) => setQuery(e.target.value);
  const onSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    (document.activeElement as HTMLElement).blur();
    dispatchRecentKeywords(query);
    router.push({
      pathname: "/search",
      query: { q: query },
    });
  };

  const loadMore = () => {
    if (!isReachingEnd && !isLoading) {
      setSize(size + 1);
    }
  };

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
    isReachingEnd,
    loadMore,
    useRecentKeywords: [recentKeywords, dispatchRecentKeywords],
  };
};

const getRecommend = async (query: string) => {
  return [
    "로고 프린트 스트라이프 스웨트셔츠",
    "스톤워싱 와이드 진",
    "엠보스드 로고 티셔츠",
    "V넥 니트 베스트",
  ];
};

export default useSearch;
