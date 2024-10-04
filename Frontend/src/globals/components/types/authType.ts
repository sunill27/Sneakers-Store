export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  token: string;
}
export interface AuthState {
  user: User;
  status: Status;
}
