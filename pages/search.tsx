import type { NextPage } from "next";
import { useRouter } from "next/router";
import { DebounceInput } from "react-debounce-input";
import { VscSearch } from "react-icons/vsc";
import ItemList from "../components/ItemList";
import ItemListEmpty from "../components/ItemList/empty";
import ItemListSkeleton from "../components/ItemList/skeleton";
import Naviagtion from "../components/Navigation";
import SearchInput from "../components/SearchInput";
import SEO from "../components/SEO";
import { useObserver } from "../services/hooks/useObserver";
import useSearch from "../services/hooks/useSearch";

const Search: NextPage = () => {
  const data = useSearch();
  const {
    items,
    recommends,
    query,
    onChange,
    onSubmit,
    isLoading,
    isEmpty,
    loadMore,
  } = data;

  const observer = useObserver(loadMore);

  const router = useRouter();

  return (
    <div>
      <SEO />
      <div>
        <SearchInput {...data} />
        <div className="py-[86px] min-h-screen">
          {items.length > 0 && <ItemList items={items} />}
          {isLoading && <ItemListSkeleton />}
          {(router.asPath === "/search" ||
            router.query.q === "" ||
            isEmpty) && <ItemListEmpty />}
          <div ref={observer} className="translate-y-[-80vh]" />
        </div>
      </div>
      <Naviagtion />
    </div>
  );
};

export default Search;
