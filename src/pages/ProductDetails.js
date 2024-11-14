import React, { useState } from 'react';
import { useParams , Link, useNavigate} from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, getProductDetails, cartItems, increase, decrease, removeFromCart, deleteProduct} = useCart();
  const product = getProductDetails(id);
  const navigate= useNavigate()

  const cartItem = cartItems.find(item => item.id === product.id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
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

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(product.id);
      navigate('/')
    }
  };

  if (!product) {
    return <Typography variant="h6" align="center">Product not found.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3,  backgroundColor: '#f0f0f0', height: '100vh' }}>
      <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{ width: '100%', height: 'auto', borderRadius: 1, mt: 2 }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>Price: ${product.price.toFixed(2)}</Typography>
        </Grid>

        <Grid item xs={12} md={6} sx={{mt:16}}>
          <Typography variant="body1" paragraph>{product.description}</Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Button variant="outlined" size="small" onClick={handleDecrease} sx={{ mr: 1 }}>-</Button>
            <Typography>{cartItem ? cartItem.quantity : quantity}</Typography>
            <Button variant="outlined" size="small" onClick={handleIncrease} sx={{ ml: 1 }}>+</Button>
          </Box>
          
          {cartItem ? (
            <>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                This item is already in the shopping cart
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  removeFromCart(product.id);
                  setQuantity(1);
                }}
              >
                Remove
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={handleAddToCart} >
              Add To Cart
            </Button>
          )}

          <Link to={`/edit-product/${id}`} style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="secondary" >
              Edit Product
            </Button>
          </Link>

          <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleDelete}>
            Delete Product
          </Button>

        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
