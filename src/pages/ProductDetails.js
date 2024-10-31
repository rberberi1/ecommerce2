import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams(); 
  const { addToCart, getProductDetails, cartItems, increase, decrease, removeFromCart } = useCart();  
  const product = getProductDetails(id);

  const cartItem = cartItems.find(item => item.id === product.id); 
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1); 

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity); 
    }
  };

  const handleIncrease = () => {
    if (cartItem) {
      increase(product.id); 
    } else {
      setQuantity(prevQuantity => prevQuantity + 1); 
    }
  };

  const handleDecrease = () => {
    if (cartItem) {
      decrease(product.id); 
    } else if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  if (!product) {
    return <div>Product not found.</div>; 
  }

  return (
    <div className="product-details">
      <div className="product-details-left">
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} />
        <div className="product-detail-price">Price: ${product.price}</div>
      </div>
      <div className="product-details-right">
        <p className="product-description">{product.description}</p>
        <div>
          Quantity:
          <button className="increase-btn" onClick={handleDecrease}>-</button>
          <span>{cartItem ? cartItem.quantity : quantity}</span>
          <button className="decrease-btn" onClick={handleIncrease}>+</button>
        </div>
        {cartItem ? (
          <>
          <div className="cart-status">This item is already in the shopping cart</div>
          <button className="cart-button remove-button" onClick={() => {removeFromCart(product.id); setQuantity(1)}}>Remove</button>
          </>
        ) : (
          <button onClick={handleAddToCart}>Add To Cart</button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
