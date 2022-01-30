import type { NextPage } from "next";
import ItemList from "../components/ItemList";
import Naviagtion from "../components/Navigation";
import SEO from "../components/SEO";
import { items } from "../data/items";

const Home: NextPage = () => {
  return (
    <div>
      <SEO />
      <ItemList items={items} />
      <Naviagtion />
    </div>
  );
};

export default Home;
