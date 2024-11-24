export type TPaymentData = {
  transactionId: string;
  amount: number;
  bikeId: string;
  userId: string;
  email: string;
  startTime?: string; // Optional field
};
