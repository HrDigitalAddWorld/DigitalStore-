import React, { createContext, useState, useContext } from "react";

export const ContextApi = createContext();

export const useAppContext = () => useContext(ContextApi);

export const ContextProvider = ({ children }) => {
  const [loginname, setLoginName] = useState(localStorage.getItem("loginname"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item._id === product._id);
      if (exists) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ContextApi.Provider value={{
      loginname,
      setLoginName,
      token,
      setToken,
      cart,
      setCart,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </ContextApi.Provider>
  );
};
