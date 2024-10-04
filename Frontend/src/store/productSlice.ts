import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/components/types/authType";
import {
  Product,
  ProductState,
} from "../globals/components/types/productTypes";
import { AppDispatch, RootState } from "./store";
import { API } from "../http";

const initialState: ProductState = {
  product: [],
  status: Status.LOADING,
  singleProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state: ProductState, action: PayloadAction<Product[]>) {
      state.product = action.payload;
    },
    setStatus(state: ProductState, action: PayloadAction<Status>) {
      state.status = Status.LOADING;
    },
    setSingleProduct(state: ProductState, action: PayloadAction<Product>) {
      state.singleProduct = action.payload;
    },
  },
});

export const { setProduct, setStatus, setSingleProduct } = productSlice.actions;
export default productSlice.reducer;

//Fetch product:
export function fetchProducts() {
  return async function fetchProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get("/admin/product");
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setProduct(data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//Fetch single product:
//Check if data is in state or not, if data is in state it doesn't hit API otherwise it hits API.
export function fetchByProductId(productId: string) {
  return async function fetchByProductIdThunk(
    dispatch: AppDispatch,
    getState: () => RootState
  ) {
    const state = getState();
    const existingProduct = state.products.product.find(
      (product: Product) => product.id === productId
    );
    if (existingProduct) {
      dispatch(setSingleProduct(existingProduct));
      dispatch(setStatus(Status.SUCCESS));
    } else {
      dispatch(setStatus(Status.LOADING));
      try {
        const response = await API.get(`admin/product/${productId}`);
        if (response.status === 200) {
          const { data } = response.data;
          console.log(data);
          dispatch(setStatus(Status.SUCCESS));
          dispatch(setSingleProduct(data));
        } else {
          dispatch(setStatus(Status.ERROR));
        }
      } catch (error) {
        dispatch(setStatus(Status.ERROR));
      }
    }
  };
}
