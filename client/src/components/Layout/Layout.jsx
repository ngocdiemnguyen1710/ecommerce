import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { HelmetM } from "../../help/helmet";
import { HelmetProvider } from "react-helmet-async";

const Layout = () => {
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
