export type TBike = {
  _id: string;
  name: string;
  model: string;
  pricePerHour: number;
  image?: string;
  brand: string;
  cc: number;
  year: number;
  isAvailable?: boolean;
  description: string;
};

export type TBikeError = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TBike[] | null;
};

export type TAdminBike = {
  _id: string;
  name: string;
};
