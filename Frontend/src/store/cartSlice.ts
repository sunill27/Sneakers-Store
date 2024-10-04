import { CartItem, CartState } from "../globals/components/types/cartTypes";
import { Status } from "../globals/components/types/authType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../http";

interface DeleteAction {
  productId: string;
}

interface UpdateAction extends DeleteAction {
  quantity: number;
}

const initialState: CartState = {
  items: [],
  status: Status.LOADING,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state: CartState, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    setStatus(state: CartState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setDeleteItem(state: CartState, action: PayloadAction<DeleteAction>) {
      const index = state.items.findIndex(
        (item) => (item.Product.id = action.payload.productId)
      );
      state.items.splice(index, 1);
    },
    setUpdateItem(state: CartState, action: PayloadAction<UpdateAction>) {
      const { productId, quantity } = action.payload;
      const index = state.items.findIndex(
        (item) => item.Product.id === productId
      );
      if (index !== -1) {
        state.items[index].quantity = Math.max(1, action.payload.quantity); // Prevent quantity from going below 0
      }
    },
  },
});

export const { setItems, setStatus, setDeleteItem, setUpdateItem } =
  cartSlice.actions;
export default cartSlice.reducer;

export function addToCart(productId: string) {
  return async function addToCartThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post("/customer/cart", {
        productId,
        quantity: 1, // Default quantity
      });
      {
        if (response.status === 200) {
          dispatch(setStatus(Status.SUCCESS));
          dispatch(setItems(response.data.data));
        } else {
          dispatch(setStatus(Status.ERROR));
        }
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//Fetch Cart Items:
export function fetchCartItems() {
  return async function fetchCartItemsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("/customer/cart");
      {
        if (response.status === 200) {
          dispatch(setStatus(Status.SUCCESS));
          dispatch(setItems(response.data.data));
        } else {
          dispatch(setStatus(Status.ERROR));
        }
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//Delete Cart Item:
export function deleteCartItem(productId: string) {
  return async function deleteCartItemThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete(
        `/customer/cart/${productId}`
      );
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteItem({ productId }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//Update Cart Item:
export function updateCartItem(productId: string, quantity: number) {
  return async function updateCartItemThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.patch(
        `/customer/cart/${productId}`,
        {
          quantity,
        }
      );
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUpdateItem({ productId, quantity }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
