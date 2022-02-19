namespace User {
  type User = {
    asks: Option[];
    bids: Option[];
    buying: [];
    selling: [];
    id: string;
  };
  type Option = {
    item: { id: string; name: string };
    option: { id: string; name: string; price: number };
  };
}
