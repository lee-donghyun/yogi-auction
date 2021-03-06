import type { NextPage } from "next";
import ItemList from "../components/ItemList";
import Naviagtion from "../components/Navigation";
import SEO from "../components/SEO";
import { getItems, PAGE_SIZE } from "../services/api/firebase";
import { useObserver } from "../services/hooks/useObserver";
import useSWRInfinite from "swr/infinite";
import ItemListSkeleton from "../components/ItemList/skeleton";
import ItemListEmpty from "../components/ItemList/empty";
import Counter from "../components/Counter";
import Button from "../components/Button";

const getKey = (index: any, prevData: any) =>
  index ? prevData.bookmark : "INITIAL_REQUEST";

const Home: NextPage = () => {
  const { data, size, setSize } = useSWRInfinite(getKey, getItems);
  const items = data?.flatMap(({ data }) => data) ?? [];
  const isLoading =
    !data || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data?.length < PAGE_SIZE);

  const observer = useObserver(() => {
    if (!isLoading && !isReachingEnd) {
      setSize(size + 1);
    }
  });

  return (
    <div>
      <SEO />
      <div className="pb-36 min-h-screen container mx-auto">
        <div className="my-16 p-5 pt-0 max-w-md">
          <div className="mb-7">
            <img src="/images/brand.png" alt="" className="w-28 h-28 mx-auto" />
          </div>
          <Counter />
          <div className="mt-10">
            <Button href="/search" mode="fill">
              상품 탐색하기
            </Button>
          </div>
        </div>
        <div>
          {items.length > 0 && <ItemList items={items} />}
          {isLoading && <ItemListSkeleton />}
          {(isReachingEnd || isEmpty) && (
            <div className="mt-10">
              <ItemListEmpty />
            </div>
          )}
          <div ref={observer} className="translate-y-[-80vh]" />
        </div>
      </div>
      <Naviagtion />
    </div>
  );
};

export default Home;
