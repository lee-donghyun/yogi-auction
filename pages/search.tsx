import type { NextPage } from "next";
import ItemList from "../components/ItemList";
import ItemListEmpty from "../components/ItemList/empty";
import ItemListSkeleton from "../components/ItemList/skeleton";
import Naviagtion from "../components/Navigation";
import SearchInput from "../components/SearchInput";
import SEO from "../components/SEO";
import { useObserver } from "../services/hooks/useObserver";
import useSearch from "../services/hooks/useSearch";

const Search: NextPage = () => {
  const search = useSearch();
  const { items, isLoading, isEmpty, loadMore } = search;

  const observer = useObserver(loadMore);

  return (
    <div>
      <SEO />
      <div>
        <SearchInput {...search} />
        <div className="py-[86px] min-h-screen">
          {items.length > 0 && <ItemList items={items} />}
          {isLoading && <ItemListSkeleton />}
          {isEmpty && <ItemListEmpty />}
          <div ref={observer} className="translate-y-[-80vh]" />
        </div>
      </div>
      <Naviagtion />
    </div>
  );
};

export default Search;
