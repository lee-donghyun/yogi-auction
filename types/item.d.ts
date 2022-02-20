namespace Item {
  type List = {
    page: number;
    totalPage: number;
    items: ListItem[];
    count: number;
  };

  type Item = {
    asks: Option[];
    bids: Option[];
    description: string;
    id: string;
    images: string[];
    like: number;
    lowestAsk: number | null;
    name: string;
    releasedAt: string;
    sold: number;
    view: number;
  };

  type Option = {
    name: string;
    options: {
      id: string;
      price: number;
      placer: string;
    }[];
  };

  type Register = {
    images: string[];
    name: string;
    description: string;
  };
}
