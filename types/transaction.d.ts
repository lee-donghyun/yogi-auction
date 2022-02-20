namespace Transaction {
  type Transaction = User.Option & {
    buyer: string;
    seller: string;
    open: boolean;
    payment: boolean;
    shipping: boolean;
    shippingNumber: boolean;
  };
}
