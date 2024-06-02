export type Session = {
  success_url: string;
  cancel_url: string;
  metadata: {
    userId: string;
    orderId: string;
    productIds: string[];
  };
};

export type CurrentProduct = {
  price: number;
  priceWithDiscount: number;
  name: string;
  totalAvailable?: number;
};
