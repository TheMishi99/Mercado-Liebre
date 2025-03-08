export type UserType = {
  id: number;
  profile_image: string;
  full_name: string;
  email: string;
  birth_date: string;
  address: string;
  profile: string;
  interests: InterestType[];
  username: string;
  password: string;
  auth_level: number;
};

export type ProductType = {
  id: number;
  image: string;
  name: string;
  alt_name: string;
  price: number;
};

export type InterestType = {
  id: number;
  name: string;
};

export type UserInterestType = {
  id: number;
  user_id: number;
  interest_id: number;
};
