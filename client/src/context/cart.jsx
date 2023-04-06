import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const newData = localStorage.getItem("cart");
    if (newData) {
      const newDataObj = JSON.parse(newData);
      setCart([...cart, ...newDataObj]);
    }
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook
export const useCart = () => {
  return useContext(CartContext);
};
