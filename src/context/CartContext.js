import { createContext, useState, useEffect, useMemo, useContext} from 'react';
import { products } from '../data';

 const CartContext = createContext();

 export const CartProvider = ({ children }) => {


  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  }, []);


  const itemCount = useMemo(
    () => cartItems.length,
    [cartItems]
  );


  const calculateTotalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  
  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + Number(quantity)} : item
        );
      } else {
        updatedItems = [...prevItems, { ...product, quantity:Number(quantity) }];
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const increase = (productId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );

      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const decrease = (productId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max((item.quantity - 1), 1 )} : item
      );

      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);

      
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const getProductDetails= (id) => {
    const product = products.find(item => item.id === parseInt(id)); 
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