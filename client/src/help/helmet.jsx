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
