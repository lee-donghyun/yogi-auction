namespace Transaction {
  type Transaction = User.Option & {
    buyer: string;
    seller: string;
    open: boolean;
    shippingNumber: boolean;
    createdAt: string;
    payedAt: string | null;
    sentAt: string | null;
    arrivedAt: string | null;
  };
  type Status = "CREATED" | "PAYED" | "SENT" | "ARRIVED";
}
