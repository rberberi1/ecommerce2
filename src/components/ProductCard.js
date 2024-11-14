import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductCard = ({ product }) => {
  const { addToCart, cartItems, increase, decrease, removeFromCart } = useCart();

  const cartItem = cartItems.find((item) => item.id === product.id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleIncrease = () => {
    if (cartItem) {
      increase(product.id);
    } else {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrease = () => {
    if (cartItem) {
      decrease(product.id);
    } else if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <Card sx={{ m: 2 }} style={{maxHeight: '60rem'}}>
      <CardMedia component="img" height="300" image={product.image} alt={product.name} />
      <CardContent>
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" component="div">
            {product.title}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          Price: ${product.price.toFixed(2)}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <IconButton onClick={handleDecrease} color="primary">
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ mx: 1 }}>{cartItem ? cartItem.quantity : quantity}</Typography>
          <IconButton onClick={handleIncrease} color="primary">
            <AddIcon />
          </IconButton>
        </Box>
        {cartItem ? (
          <>
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              This item is already in the shopping cart
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<RemoveShoppingCartIcon />}
              onClick={() => {
                removeFromCart(product.id);
                setQuantity(1);
              }}
              fullWidth
              sx={{ mt: 1 }}
            >
              Remove
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            bgcolor="#FFB703"
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAddToCart}
            fullWidth
            sx={{ mt: 1 }}
          >
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
