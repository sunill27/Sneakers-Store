import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import store from "./store/store";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import MyOrders from "./pages/orders/MyOrders";
import MyOrdersDetails from "./pages/orders/MyOrdersDetails";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/myorder" element={<MyOrders />} />
            <Route path="/myorder/:id" element={<MyOrdersDetails />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
