import { Status } from "./authType";

interface User {
  username: string;
  email: string;
  password: string;
}

interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  categoryId: string;
  user: User;
  Category: Category;
}

export interface ProductState {
  product: Product[];
  status: Status;
  singleProduct: Product | null;
}
