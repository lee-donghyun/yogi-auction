import type { NextPage } from "next";
import ItemList from "../components/ItemList";
import Naviagtion from "../components/Navigation";
import SEO from "../components/SEO";
import { items } from "../data/items";

const Home: NextPage = () => {
  return (
    <div>
      <SEO />
      <ItemList
        itemList={{
          page: 0,
          totalPage: 0,
          items,
        }}
      />
      <Naviagtion />
    </div>
  );
};

export default Home;
