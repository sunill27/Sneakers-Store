import { Status } from "./authType";
import { Product } from "./productTypes";

export interface CartItem {
  Product: Product;
  productId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  status: Status;
}
