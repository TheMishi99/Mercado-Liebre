import { InterestType, ProductType, UserType } from "./backend-types";

type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiErrorResponse = {
  status: number;
  error: string;
  url: string;
  method: ApiMethod;
};

export type ApiProductsResponse = {
  status: number;
  products: ProductType[];
  url: string;
  method: ApiMethod;
};
export type ApiSearchProductsResponse = {
  status: number;
  results: ProductType[];
  url: string;
  method: ApiMethod;
};
export type ApiProductResponse = {
  status: number;
  product: ProductType;
  url: string;
  method: ApiMethod;
};
export type ApiCreateProductResponse = {
  status: number;
  new_product: ProductType;
  url: string;
  method: ApiMethod;
};
export type ApiUpdateProductResponse = {
  status: number;
  updated_product: ProductType;
  url: string;
  method: ApiMethod;
};
export type ApiDeleteProductResponse = {
  status: number;
  ok: boolean;
  url: string;
  method: ApiMethod;
};

export type ApiUsersResponse = {
  status: number;
  users: UserType[];
  url: string;
  method: ApiMethod;
};
export type ApiRegisterUserResponse = {
  status: number;
  ok: boolean;
  url: string;
  method: ApiMethod;
};
export type ApiLoginUserResponse = {
  status: number;
  user: UserType;
  url: string;
  method: ApiMethod;
};
export type ApiUserResponse = {
  status: number;
  user: UserType;
  url: string;
  method: ApiMethod;
};
export type ApiUpdateUserResponse = {
  status: number;
  user: UserType;
  url: string;
  method: ApiMethod;
};
export type ApiLogoutUserResponse = {
  status: number;
  ok: boolean;
  url: string;
  method: ApiMethod;
};

export type ApiInterestsResponse = {
  status: number;
  interests: InterestType[];
  url: string;
  method: ApiMethod;
};
export type ApiInterestResponse = {
  status: number;
  interest: InterestType;
  url: string;
  method: ApiMethod;
};
