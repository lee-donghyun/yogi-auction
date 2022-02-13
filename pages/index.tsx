import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ItemList from "../components/ItemList";
import Naviagtion from "../components/Navigation";
import SEO from "../components/SEO";
import { getItems } from "../services/api/firebase";
import { useObserver } from "../services/hooks/useObserver";

const Home: NextPage = () => {
  const [items, setItems] = useState<any>([]);
  const [bookmark, setBookmark] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getItems()
      .then((res) => {
        console.log(res);

        setItems(res.data);
        setBookmark(res.bookmark);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const observer = useObserver(() => {
    setIsLoading(true);
    bookmark &&
      getItems(bookmark)
        .then((res) => {
          console.log(res);
          setItems([...items, ...res.data]);
          setBookmark(res.bookmark);
        })
        .finally(() => {
          setIsLoading(false);
        });
  });
  return (
    <div>
      <SEO />
      <ItemList items={items} />
      <Naviagtion />
      <div ref={observer} className="translate-y-[-80vh]" />
    </div>
  );
};

export default Home;
