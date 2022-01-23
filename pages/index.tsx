import type { NextPage } from "next";
import ItemList from "../components/ItemList";
import Naviagtion from "../components/Navigation";
import { items } from "../data/items";

const Home: NextPage = () => {
  return (
    <div>
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
