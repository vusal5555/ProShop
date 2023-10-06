import React from "react";
import ReactDOM from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import HomeScreen from "./screens/HomeScreen";
import reportWebVitals from "./reportWebVitals";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PriveRoute from "./components/PriveRoute";
import PaymentScreen from "./screens/PaymentScree";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminRoute from "./components/AdminRoute";
import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEdit from "./screens/admin/ProductEdit";
import UserList from "./screens/admin/UserList";
import UserDetail from "./screens/admin/userDetail";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route index={true} path="/" element={<HomeScreen></HomeScreen>}></Route>
      <Route
        path="/search/:keyword"
        element={<HomeScreen></HomeScreen>}
      ></Route>
      <Route
        path="/page/:pageNumber"
        element={<HomeScreen></HomeScreen>}
      ></Route>
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomeScreen></HomeScreen>}
      ></Route>
      <Route
        path="/product/:id"
        element={<ProductScreen></ProductScreen>}
      ></Route>
      <Route path="/cart" element={<CartScreen></CartScreen>}></Route>
      <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>
      <Route
        path="/register"
        element={<RegisterScreen></RegisterScreen>}
      ></Route>

      <Route path="" element={<PriveRoute></PriveRoute>}>
        <Route
          path="/shipping"
          element={<ShippingScreen></ShippingScreen>}
        ></Route>
        <Route
          path="/payment"
          element={<PaymentScreen></PaymentScreen>}
        ></Route>
        <Route
          path="/placeorder"
          element={<PlaceOrderScreen></PlaceOrderScreen>}
        ></Route>
        <Route path="/order/:id" element={<OrderScreen></OrderScreen>}></Route>
        <Route
          path="/profile"
          element={<ProfileScreen></ProfileScreen>}
        ></Route>
      </Route>
      <Route path="" element={<AdminRoute></AdminRoute>}>
        <Route
          path="/admin/orderList"
          element={<OrderListScreen></OrderListScreen>}
        ></Route>
        <Route
          path="/admin/productList"
          element={<ProductListScreen></ProductListScreen>}
        ></Route>
        <Route
          path="/admin/productList/:pageNumber"
          element={<ProductListScreen></ProductListScreen>}
        ></Route>
        <Route
          path="/admin/product/:id/edit"
          element={<ProductEdit></ProductEdit>}
        ></Route>
        <Route path="/admin/userList" element={<UserList></UserList>}></Route>
        <Route
          path="/admin/user/:id/edit"
          element={<UserDetail></UserDetail>}
        ></Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={false}>
          <RouterProvider router={router}></RouterProvider>
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
