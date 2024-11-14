import { createContext, useState, useEffect, useMemo, useContext} from 'react';
import { products } from '../data';

 const CartContext = createContext();

 export const CartProvider = ({ children }) => {


  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        console.log(products);
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
    const product = allProducts.find(item => item.id === parseInt(productId)); 
    return product;
  }

  const addProduct = (newProduct) => {
    const updatedProducts = [...allProducts,{...newProduct, id:Date.now()}];
    setAllProducts(updatedProducts);  
  };

  const editProduct = (updatedProduct) => {
    const updatedProducts = allProducts.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setAllProducts(updatedProducts); 
  };

  const deleteProduct = (productId) => {
    const updatedProducts = allProducts.filter(product => product.id!== productId);
    setAllProducts(updatedProducts);  
  };

  return (
    <CartContext.Provider 
    value={{ 
      addToCart, 
      increase, 
      decrease, 
      removeFromCart, 
      cartItems, 
      calculateTotalPrice, 
      itemCount, 
      getProductDetails, 
      addProduct,
      editProduct,
      deleteProduct,
      allProducts,
      setAllProducts
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);