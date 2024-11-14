import React, { useContext } from 'react';
import { useCart } from '../context/CartContext';
import { List, ListItem, Typography } from '@mui/material';

const Receipt = () => {
 const {cartItems, calculateTotalPrice}=useCart();
 const total = calculateTotalPrice();

  return (
    <div>
      <Typography variant="h5">Receipt</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
    </div>
  );
};

export default Receipt;
