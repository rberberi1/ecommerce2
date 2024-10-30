
import React, { useState } from "react"; 
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(quantity);
      setQuantity(1); 
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <Link to={`/products/${product.id}`}><div className="product-title">{product.name}</div></Link>
      <div className="product-price">Price: ${product.price}</div>
      <div>
        Quantity: 
        <input 
          type="number" 
          min="1" 
          value={quantity} 
          onChange={e => setQuantity(e.target.value)} 
        />
      </div>
      <button onClick={handleAddToCart}>Add To Cart</button>
    </div>
  );
};

export default ProductCard;
