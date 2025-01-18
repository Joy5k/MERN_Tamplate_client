import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};
export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};
export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};
export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean|React.Key;
};
export interface ImgBBResponseData {
  data: {
    url: string;
    // Add other properties here if needed
  };
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  data: AuthData;
}

interface AuthData {
  message: string;
  qrCode: string;
  secret: string;
}

export interface IQrCodeData {
  message: string;
  qrCode: string; 
  secret: string;
}
export interface IDivision {
  id: string; // Adjust according to actual API response
  division: string;
}

export interface IDistrict {
  id: string; // Adjust according to actual API response
  district: string;
}

export interface ISubDistrict {
  id: string; // Adjust according to actual API response
  upazillas: string[]
}

export interface userSelectedProductProperty{
  productColor?:string;
  userSelectedQuantity?:number;

}
export interface IProduct extends userSelectedProductProperty {
  _id?:string;
  title: string;
  description: string;
  category:string;
  image: string;
  price: number;
  quantity: number;
  color: string[];
  rating?: number;
  sellerId:string;
}

export interface IUser {
  _id:string
  firstName:string;
  lastName:string;
  image:string;
  email:string;
  status:string;
  role:string
}
// Make 'id' optional to accommodate incoming messages that already have an 'id'
export interface IMessage {
  [x: string]: any;
  id?: string;
  text: string;
  user: string;
  role:string;
  sender:string
  room:string
 
}

export interface IUserSubscription {
  email: string;
  isActive?: boolean;
}

export interface IOfferProduct {
  _id?:string
  productId: string; // Reference to the product
  offerPercentage: number; // Discount percentage
  offerPrice: number; // Calculated price after discount
  offerStartDate: string; // ISO string for date and time
  offerEndDate: string; // ISO string for date and time
  offerType: "general" | "dealOfTheDay" | "other"; // Type of offer
  offerStatus: boolean; // Whether the offer is active
}



 export interface IProductId  {
  _id:string;
  productId: IProduct;
  offerPercentage: number; // Discount percentage
  offerPrice: number; // Calculated price after discount
  offerStartDate: string; // ISO string for date and time
  offerEndDate: string; // ISO string for date and time
  offerType: "general" | "dealOfTheDay" | "other"; // Type of offer
  offerStatus: boolean; 

}
