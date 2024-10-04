import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MyOrdersData,
  OrderData,
  OrderDetails,
  OrderResponseData,
  OrderResponseItem,
} from "../globals/components/types/checkoutTypes";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../http";

// Enum for Status
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

// Initial state with properly typed OrderResponseData
const initialState: OrderResponseData = {
  items: [],
  status: Status.LOADING,
  khaltiUrl: null,
  myOrders: [],
  orderDetails: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setItems(
      state: OrderResponseData,
      action: PayloadAction<OrderResponseItem>
    ) {
      state.items.push(action.payload);
    },
    setStatus(state: OrderResponseData, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setMyOrders(
      state: OrderResponseData,
      action: PayloadAction<MyOrdersData[]>
    ) {
      state.myOrders = action.payload;
    },
    setMyOrderDetails(
      state: OrderResponseData,
      action: PayloadAction<OrderDetails[]>
    ) {
      state.orderDetails = action.payload;
    },
    setKhaltiUrl(
      state: OrderResponseData,
      action: PayloadAction<OrderResponseData["khaltiUrl"]>
    ) {
      state.khaltiUrl = action.payload;
    },
  },
});

export const {
  setItems,
  setStatus,
  setMyOrders,
  setMyOrderDetails,
  setKhaltiUrl,
} = orderSlice.actions;
export default orderSlice.reducer;

//Order Item:
export function orderItem(data: OrderData) {
  return async function orderItemThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post("/order", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
        if (response.data.url == 200) {
          dispatch(setKhaltiUrl(response.data.url));
        } else {
          dispatch(setKhaltiUrl(null));
        }
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//Fetch Order:
export function fetchMyOrders() {
  return async function fetchMyOrdersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("/order/customer");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setMyOrders(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//Fetch Order Details:
export function fetchMyOrderDetails(id: string) {
  return async function fetchMyOrderDetailsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("/order/customer/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setMyOrderDetails(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
