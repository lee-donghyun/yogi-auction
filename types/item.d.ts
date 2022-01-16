type ListItem = {
  image: {
    gallery: string[];
    thumbnail: string;
  };
  name: string;
  lowestAsk: number;
};

type List = {
  page: number;
  totalPage: number;
  items: ListItem[];
};

type Item = {
  image: {
    gallery: string[];
    thumbnail: string;
  };
  name: string;
  description: string;
  ask: {
    option: Option;
    price: number;
  }[];
  bid: {
    option: Option;
    price: string;
  }[];
};

type Option = {
  name: string;
  id: string;
};
