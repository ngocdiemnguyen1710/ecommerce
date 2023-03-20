import React from "react";
import { useAuth } from "../context/auth";

const Homepage = () => {
  const [auth, setAuth] = useAuth();
  return <div className="m-9">{JSON.stringify(auth, null, 4)}</div>;
};

export default Homepage;
