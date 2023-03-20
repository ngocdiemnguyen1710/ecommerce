import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../config/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios
  axiosClient.defaults.headers.common["Authorization"] = auth.token;

  useEffect(() => {
    const authObj = localStorage.getItem("auth");
    if (authObj) {
      const newAuthObj = JSON.parse(authObj);
      setAuth({ ...auth, user: newAuthObj.user, token: newAuthObj.token });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
