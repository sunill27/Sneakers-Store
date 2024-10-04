import { Status } from "./authType";
import { Product } from "./productTypes";

export enum PaymentMethod {
  COD = "cod",
  KHALTI = "khalti",
}

export enum OrderStatus {
  PENDING = "pending",
  DELIVERED = "delivered",
  ONTHEWAY = "ontheway",
  CANCELLED = "cancelled",
  PREPARATION = "preparation",
  All = "all",
}

export interface ItemDetails {
  productId: string;
  quantity: number;
}

export interface OrderResponseItem extends ItemDetails {
  orderId: string;
}

export enum PaymentStatus {
  PAID = "paid",
  UNPAID = "unpaid",
  PENDING = "pending",
}

export interface Payment {
  paymentMethod: PaymentMethod;
}

export interface OrderPaymentData extends Payment {
  paymentStatus: PaymentStatus;
}

export interface OrderData {
  phoneNumber: string;
  address: string;
  totalAmount: number;
  paymentDetails: Payment;
  items: ItemDetails[];
}

export interface OrderResponseData {
  items: OrderResponseItem[];
  status: Status;
  khaltiUrl: string | null;
  myOrders: MyOrdersData[];
  orderDetails: OrderDetails[];
}

export interface UserData {
  username: string;
  email: string;
}

export interface MyOrdersData {
  id: string;
  phoneNumber: number;
  address: string;
  totalAmount: number;
  orderStatus: OrderStatus;
  createdAt: string;
  paymentId: string;
  userId: UserData;
  Payment: OrderPaymentData;
}

export interface OrderDetails {
  id: string;
  quantity: number;
  orderId: string;
  Product: Product;
  Order: MyOrdersData;
}
