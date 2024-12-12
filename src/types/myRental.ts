import { TAdminCar } from "./car";
import { TAdminUser } from "./user";

export type TMyRental = {
  _id: string;
  carId: {
    _id: string;
    name: string;
    image: string;
  };
  startTime: string;
  returnTime?: string | null;
  totalCost: number;
  isReturned: boolean;
  paymentStatus: "paid" | "advanced";
  transactionId: string;
};

export type TRental = {
  _id: string;
  userId: string;
  carId: string;
  startTime: Date;
  returnTime?: Date;
  totalCost?: number;
  isReturned?: boolean;
  paymentStatus?: "paid" | "advanced";
  transactionId?: string;
};

export type TAdminRental = {
  _id: string;
  userId: TAdminUser;
  carId: TAdminCar;
  startTime: Date;
  returnTime?: Date | null;
  totalCost: number;
  isReturned: boolean;
  paymentStatus: "paid" | "advanced";
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
};
