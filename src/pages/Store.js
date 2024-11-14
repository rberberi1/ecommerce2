import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import { useCart } from '../context/CartContext';
import { Box } from '@mui/material';

const Store = () => {
  const { addToCart, allProducts } = useCart();

  return (
    <Box display="flex">
     
      <Sidebar />

      <Box className="products-grid" sx={{ flexGrow: 1, p: 2 }}>
        {allProducts.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={(quantity) => addToCart(product, quantity)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Store;
