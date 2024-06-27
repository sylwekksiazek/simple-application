export enum RoomAvailabilityStatus {
  AVAILABLE = 'available',
  ONREQUEST = 'onRequest',
  SOLDOUT = 'soldOut',
  ERROR = 'error',
}

export interface IRoom {
  id: number;
  name: string;
  price: IPrice;
  avail?: IRoomAvail;
}

export interface IRoomAvail {
  availabilityStatus: RoomAvailabilityStatus;
  price?: IPrice;
}

export interface IPrice {
  value: number;
  currencyCode: string;
}
