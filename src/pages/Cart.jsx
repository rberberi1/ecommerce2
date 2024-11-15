import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const Cart = () => {
  const { cartItems, itemCount, calculateTotalPrice, increase, decrease, removeFromCart } = useCart();

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" component="h2">
          Shopping Cart
        </Typography>
        <Typography variant="subtitle1">Products: {itemCount}</Typography>
        <Typography variant="subtitle1">
          Total Price: ${calculateTotalPrice.toFixed(2)}
        </Typography>
      </Box>

      <Divider />

      {itemCount > 0 ? (
        <Box
          sx={{
            maxHeight: 400,
            overflowY: 'auto', 
            pr: 1, 
          }}
        >
          <List>
            {cartItems.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  mb: 2,
                }}
                style={{ borderBottom: 'gray solid' }}
              >
                <ListItemText
                  primary={
                    <Link
                      to={`/products/${item.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {item.title}
                    </Link>
                  }
                  secondary={`${item.quantity} x $${item.price.toFixed(2)}`}
                  sx={{ width: '100%' }}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => decrease(item.id)}
                  >
                    -
                  </Button>
                  <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => increase(item.id)}
                  >
                    +
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => removeFromCart(item.id)}
                    sx={{ ml: 2 }}
                  >
                    Remove
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 3 }}>
          Your cart is empty.
        </Typography>
      )}
    </Box>
  );
};

export default Cart;
