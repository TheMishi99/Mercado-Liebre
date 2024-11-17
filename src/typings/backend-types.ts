export type UserType = {
  id: string;
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
  id: string;
  image: string;
  name: string;
  alt_name: string;
  price: number;
};

export type InterestType = {
  id: string;
  name: string;
};

export type UserInterestType = {
  id: string;
  user_id: string;
  interest_id: string;
};
