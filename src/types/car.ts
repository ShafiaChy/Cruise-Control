export type TCar = {
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


export type TCarError = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TCar[] | null;
};

export type TAdminCar = {
  _id: string;
  name: string;
};
