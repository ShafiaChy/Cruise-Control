export type TPaymentData = {
  transactionId: string;
  amount: number;
  carId: string;
  userId: string;
  email: string;
  startTime?: string; // Optional field
};
