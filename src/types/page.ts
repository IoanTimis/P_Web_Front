export type Player = {
  id: number;
  position: number;
  balance: number;
  in_jail: boolean;
  is_bankrupt: boolean;
  username: string;
  user_id: number;
  properties: Property[];
};

export type Property = {
  id: number;
  name: string;
  color_group: string;
  houses: number;
  price: number;
  rent: number;
  owner_id: number | null;
  position: number;
  is_mortgage: boolean;
};



