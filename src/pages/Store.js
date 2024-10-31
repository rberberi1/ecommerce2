import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const Store = () => {
  const { addToCart, getAllProducts } = useCart();

  const products = getAllProducts();

  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          onAddToCart={(quantity) => addToCart(product, quantity)}
        />
      ))}
    </div>
  );
}

export default Store;
