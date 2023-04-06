import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./routes";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";
import { CartProvider } from "./context/cart";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster />
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
