import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axiosClient from "../../config/axios";
import { useAuth } from "../../context/auth";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await axiosClient.get("/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) checkAuth();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
