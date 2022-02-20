namespace User {
  type User = {
    address: string;
    bankAccount: string;
    asks: Option[];
    bids: Option[];
    transactions: {
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
