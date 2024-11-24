import { TAdminBike } from "./bike";
import { TAdminUser } from "./user";

export type TMyRental = {
  _id: string;
  bikeId: {
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
  bikeId: string;
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
  bikeId: TAdminBike;
  startTime: Date;
  returnTime?: Date | null;
  totalCost: number;
  isReturned: boolean;
  paymentStatus: "paid" | "advanced";
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
};
