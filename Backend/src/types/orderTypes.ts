export interface OrderData {
  phoneNumber: string;
  address: string;
  totalAmount: number;
  paymentDetails: {
    paymentMethod: PaymentMethod;
    paymentStatus?: PaymentStatus;
    pidx?: string;
  };
  items: OrderDetails[];
}

export interface OrderDetails {
  quantity: number;
  productId: string;
}

export enum PaymentMethod {
  COD = "cod",
  KHALTI = "khalti",
}

export enum PaymentStatus {
  PAID = "paid",
  UNPAID = "unpaid",
}

export interface KhaltiResponse {
  pidx: string;
  payment_url: string;
  expires_at: Date | string;
  expires_in: number;
  user_fee: number;
}

export interface TransactionResponse {
  pidx: string;
  total_amount: number;
  status: TransactionStatus;
  transaction_id: string;
  fee: number;
  refunded: boolean;
}

export enum TransactionStatus {
  COMPLETED = "Completed",
  PENDING = "Pending",
  REFUNDED = "Refunded",
  INITIALIZED = "Initialized",
}

export enum OrderStatus {
  PENDING = "pending",
  CANCELLED = "cancelled",
  DELIVERED = "delivered",
  ONTHEWAY = "ontheway",
  PREPARATION = "preparation",
}
