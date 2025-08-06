import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define order status types
export enum Status {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
}

// Define the initial state
const initialState = {
  status: Status.IDLE,
  khaltiUrl: null as string | null,
};

// Create the order slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrderSuccess: (state, action: PayloadAction<string>) => {
      state.status = Status.SUCCESS;
      state.khaltiUrl = action.payload;
    },
    placeOrderFailure: (state) => {
      state.status = Status.FAILED;
    },
    resetOrderStatus: (state) => {
      state.status = Status.IDLE; // Reset order status to IDLE
      state.khaltiUrl = null; // Clear any stored Khalti URL
    },
  },
});

// Export actions
export const { placeOrderSuccess, placeOrderFailure, resetOrderStatus } =
  orderSlice.actions;

// Export reducer
export default orderSlice.reducer;
