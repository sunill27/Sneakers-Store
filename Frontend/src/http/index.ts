import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Content_Type: "application/json",
    Accept: "application/json",
  },
});

const APIAuthenticated = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Content_Type: "application/json",
    Accept: "application/json",
    Authorization: `${localStorage.getItem("token")}`,
  },
});

export { API, APIAuthenticated };
