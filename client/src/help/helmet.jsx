import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const initValue = {
  title: "",
  description: "",
  keywords: "",
  author: "",
};
export const HelmetM = () => {
  const location = useLocation();
  const path = location.pathname;

  const [data, setData] = useState(initValue);

  useEffect(() => {
    if (path === "/about") {
      setData({
        ...data,
        title: "About Us - NDEcommerce",
        description: "about us",
      });
    }
    if (path === "/contact") {
      setData({ ...data, title: "Contact - NDEcommerce" });
    }
    if (path === "/policy") {
      setData({ ...data, title: "Policy - NDEcommerce" });
    }
    if (path === "/register") {
      setData({ ...data, title: "Register - NDEcommerce" });
    }
    if (path === "/login") {
      setData({ ...data, title: "Login - NDEcommerce" });
    }
    if (path === "/dashboard/admin") {
      setData({ ...data, title: "Admin & Dashboard - NDEcommerce" });
    }
    if (path === "/dashboard/admin/create-category") {
      setData({
        ...data,
        title: "Admin & Dashboard CreateCategory - NDEcommerce",
      });
    }
    if (path === "/dashboard/admin/create-product") {
      setData({
        ...data,
        title: "Admin & Dashboard CreateProduct - NDEcommerce",
      });
    }
    if (path === "/dashboard/admin/users") {
      setData({
        ...data,
        title: "Admin & Dashboard Users - NDEcommerce",
      });
    }
    if (path === "/dashboard/user") {
      setData({ ...data, title: "User & Dashboard - NDEcommerce" });
    }
    if (path === "/dashboard/user/profile") {
      setData({ ...data, title: "User & Dashboard Profile- NDEcommerce" });
    }
    if (path === "/dashboard/user/orders") {
      setData({ ...data, title: "User & Dashboard Orders- NDEcommerce" });
    }
  }, [data.title, path]);

  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords} />
      <meta name="author" content={data.author} />
      <title>{data.title}</title>
    </Helmet>
  );
};
