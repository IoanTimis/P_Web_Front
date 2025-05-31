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

export type reqOffer = {
  amount: number;
  property_ids: number[];
}

export interface TradeOffer {
  game_id: number;
  offer: reqOffer;
  request: reqOffer;
  sender_id: number;
  receiver_id: number | null;
}

export interface Trade {
  game_id: number;
  offer: reqOffer;
  request: reqOffer;
  sender_id: number;
  sender_username: string;
  trade_id: number;
}



