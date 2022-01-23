namespace Item {
  type ListItem = {
    image: string;
    name: string;
    lowestAsk: string;
    id: string;
  };

  type List = {
    page: number;
    totalPage: number;
    items: ListItem[];
  };

  type Item = {
    imageList: string[];
    name: string;
    description: string;
    ask: Option[];
    bid: Option[];
    lastSalePrice: string;
    lowestAsk: string;
  };

  type Option = {
    id: string;
    name: string;
    price: string;
    quantity: number;
  };
}