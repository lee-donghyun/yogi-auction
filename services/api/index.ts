import { items } from "../../data/items";

export const getItems = () => {
  return items;
};

export const getItem = (id: string) => {
  return items.find((item) => item.id === id) as any;
};
