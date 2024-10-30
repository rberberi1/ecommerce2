// CartContext.js
import React, { createContext, useState, useEffect, useMemo} from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from local storage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  }, []);


  const itemCount = useMemo(
    () => cartItems.length,
    [cartItems]
  );

  // const sumItems = useMemo(
  //   () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
  //   [cartItems]
  // );

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Add a product to the cart
  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedItems = [...prevItems, { ...product, quantity }];
      }

      // Save updated cart to local storage
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // Increase quantity of an item in the cart
  const increase = (productId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );

      // Save updated cart to local storage
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // Decrease quantity of an item in the cart
  const decrease = (productId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      );

      // Save updated cart to local storage
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // Remove a product from the cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);

      // Save updated cart to local storage
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (
    <CartContext.Provider value={{ addToCart, increase, decrease, removeFromCart, cartItems, calculateTotalPrice, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};
