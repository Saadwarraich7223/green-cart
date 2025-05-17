import React from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAdress from "./pages/AddAdress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/sellersDashboard/SellerLogin";
import SellerLayout from "./pages/sellerDashboard/SellerLayout";
import AddProduct from "./pages/sellerDashboard/AddProduct";
import ProductList from "./pages/sellerDashboard/ProductList";
import Orders from "./pages/sellerDashboard/Orders";
import PaymentLoader from "./components/PaymentLoader";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();
  return (
    <div className=" text-default min-h-screen text-gray-700 bg-white">
      <ScrollToTop />
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}

      <Toaster />

      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-adress" element={<AddAdress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/loader" element={<PaymentLoader />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="/seller/product-list" element={<ProductList />} />
            <Route path="/seller/orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
