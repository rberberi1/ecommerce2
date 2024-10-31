import { createContext, useState, useEffect, useMemo, useContext} from 'react';
import { products } from '../data';

 const CartContext = createContext();

 export const CartProvider = ({ children }) => {


  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  }, []);


  const itemCount = cartItems.length;


  const calculateTotalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);



  const addToCart = (product, quantity) => {
    const updatedItems = [...cartItems, { ...product, quantity: Number(quantity) }]; 
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };
  
  const increase = (productId) => {
    const updatedItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
  
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };
  

  const decrease = (productId) => {
    const updatedItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
    );
  
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };
  

  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter(item => item.id !== productId);
  
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };
  

  const getProductDetails= (productId) => {
    const product = products.find(item => item.id === parseInt(productId)); 
    return product;
  }

  const getAllProducts=()=>{
    return products;
  }

  return (
    <CartContext.Provider value={{ addToCart, increase, decrease, removeFromCart, cartItems, calculateTotalPrice, itemCount, getProductDetails, getAllProducts}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);