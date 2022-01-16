import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Naviagtion from "../components/Navigation";
import SearchBar from "../components/SearchBar";

const Search: NextPage = () => {
  const { data, ...searchBarProps } = useSearch();
  return (
    <div>
      <div>
        <h1>Search Results</h1>
      </div>
      <SearchBar {...searchBarProps} />
      <Naviagtion />
    </div>
  );
};

export default Search;

const useSearch = () => {
  const router = useRouter();
  const sp = new URLSearchParams(router.asPath.split("?")?.[1]);
  const [query, setQuery] = useState<string>(sp?.get("q") ?? "");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const onChange = (e: any) => setQuery(e.target.value);
  const onSubmit = (e: any) => {
    e.preventDefault();
    router.push({ pathname: "/search", query: { ...router.query, q: query } });
  };
  useEffect(() => {
    if (typeof router.query.q === "string") {
      setIsLoading(true);
      getItem(router.query.q)
        .then((res) => {
          setData(res);
        })
        .finally(() => setIsLoading(false));
    }
  }, [router.query.q]);

  return { data, query, onChange, onSubmit };
};

const getItem = async (query: string) => {
  return [];
};
