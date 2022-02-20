namespace User {
  type User = {
    asks: Option[];
    bids: Option[];
    transaction: {
      item: { id: string; name: string };
      id: string;
      createdAt: string;
    }[];
    id: string;
  };
  type Option = {
    item: { id: string; name: string };
    option: { id: string; name: string; price: number; placer: string };
  };
}
