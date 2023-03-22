import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { HelmetM } from "../../help/helmet";
import { HelmetProvider } from "react-helmet-async";
import { useAuth } from "../../context/auth";

const Layout = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (auth?.token && location.pathname === "/login") {
      navigate("/");
    }
  }, [auth?.token, location, navigate]);
  return (
    <HelmetProvider>
      <HelmetM />
      <Header />
      <div
        style={{ minHeight: "70vh", padding: "30px" }}
        className="content-container"
      >
        <Outlet />
      </div>
      <Footer />
    </HelmetProvider>
  );
};

export default Layout;
