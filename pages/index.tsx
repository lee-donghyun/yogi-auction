import type { NextPage } from "next";
import { useEffect } from "react";
import ItemList from "../components/ItemList";
import Naviagtion from "../components/Navigation";
import SEO from "../components/SEO";
import { getItems, PAGE_SIZE } from "../services/api/firebase";
import { useObserver } from "../services/hooks/useObserver";
import useSWRInfinite from "swr/infinite";
import ItemListSkeleton from "../components/ItemList/skeleton";
import ItemListEmpty from "../components/ItemList/empty";
import { useRouter } from "next/router";
import Counter from "../components/Counter";
import Button from "../components/Button";

const getKey = (index: any, prevData: any) =>
  index ? prevData.bookmark : "INITIAL_REQUEST";

const Home: NextPage = () => {
  const router = useRouter();

  const { data, size, setSize } = useSWRInfinite(getKey, getItems);
  const items = data?.flatMap(({ data }) => data) ?? [];
  const isLoading =
    !data || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data?.length < PAGE_SIZE);

  const observer = useObserver(() => {
    if (!isLoading && !isReachingEnd) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, p: size + 1 },
        },
        undefined,
        { scroll: false }
      );
    }
  });

  useEffect(() => {
    if (typeof router.query.p === "string") {
      setSize(Number(router.query.p) || 0);
    }
  }, [router.query.p]);

  return (
    <div>
      <SEO />
      <div className="pb-[86px] min-h-screen">
        <div className="my-16 p-5 pt-0">
          <div className="mb-7">
            <img src="/images/brand.png" alt="" className="w-28 h-28 mx-auto" />
          </div>
          <Counter />
          <div className="mt-10">
            <Button href="/auth/signup" mode="fill">
              Sign Up
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
