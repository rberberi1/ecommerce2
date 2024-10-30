import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { products } from '../data'; 


const ProductDetails = () => {
  const { id } = useParams(); 
  const { addToCart } = useContext(CartContext); 
  const product = products.find(item => item.id === parseInt(id)); 
  const [quantity, setQuantity] = useState(1); 

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity); 
      setQuantity(1); 
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
        <div className='product-details-right'>
          <p className='product-description'>{product.description}</p>
          Quantity:  
           <input 
            type="number" 
            min="1" 
            value={quantity} 
            onChange={e => setQuantity(e.target.value)} 
          />
        
        <button onClick={handleAddToCart}>Add To Cart</button>
        </div>
    </div>
  );
};

export default ProductDetails;
