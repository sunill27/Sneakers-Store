import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../http";
import {
  AuthState,
  LoginData,
  RegisterData,
  Status,
  User,
} from "../globals/components/types/authType";
import { AppDispatch } from "./store";

const initialState: AuthState = {
  user: {} as User,
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setStatus(state: AuthState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    resetStatus(state: AuthState) {
      state.status = Status.LOADING;
    },

    setToken(state: AuthState, action: PayloadAction<string>) {
      state.user.token = Status.LOADING;
    },
    resetToken(state: AuthState, action: PayloadAction<string>) {
      state.user.token = {} as string;
    },
  },
});

//TO create Action:
export const { setUser, setStatus, resetStatus, setToken, resetToken } =
  authSlice.actions;
export default authSlice.reducer;

//REGISTER:
export function register(data: RegisterData) {
  return async function registerThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/register", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//LOGIN:
export function login(data: LoginData) {
  return async function loginThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/login", data);
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setToken(data));
        localStorage.setItem("token", data); //To store in localStorage
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
