import React from 'react';
import { useCart } from '../context/CartContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Sidebar = () => {
  const { searchTerm, updateSearchTerm, priceOrder, updatePriceOrder} = useCart();

  const handleSearchChange = (e) => {
    updateSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    updatePriceOrder(e.target.value);
  };

  return (
    <Box sx={{ width: 250, p:3, bgcolor: '#FB8500', position:'sticky', top: 2, height:'100vh', } }>
      <Typography sx={{}} variant="h6" gutterBottom>Filters</Typography>

  
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 3 , bgcolor:'#fff'}}
      />

     
      <FormControl fullWidth sx={{ mb: 3 , bgcolor:'#fff'}}>
        <InputLabel>Sort by Price</InputLabel>
        <Select
          value={priceOrder}
          label="Sort by Price"
          onChange={handleSortChange}
        >
          <MenuItem value="asc">Lowest</MenuItem>
          <MenuItem value="desc">Highest</MenuItem>
        </Select>
      </FormControl>
      </Box>
  );
}

export default Sidebar;
