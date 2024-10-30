import { products } from "../data";
import ProductCard from '../components/ProductCard';
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Store=()=>{
  const {addToCart}=useContext(CartContext)
  return(
      <div className="products-grid">
      {products.map(product=>(
        <ProductCard 
        key={product.id} 
        product={product}
        onAddToCart={(quantity) => addToCart(product, quantity)}/>
      ))}
      </div>
  );
}

export default Store;