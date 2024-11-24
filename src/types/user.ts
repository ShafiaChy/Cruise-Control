export type TUserRole = "user" | "admin";
export interface TUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TUserRole;
}

export type TAdminUser = {
  _id: string;
  name: string;
  email: string;
};
