import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Sidebar = () => {
  const { allProducts, setAllProducts } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceOrder, setPriceOrder] = useState('');

  const filterAndSortProducts = () => {
    let filteredProducts = allProducts;

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (priceOrder === 'asc') {
        return a.price - b.price;
      } else if (priceOrder === 'desc') {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

    setAllProducts(sortedProducts);
  };

  useEffect(() => {
    filterAndSortProducts();
  }, [searchTerm, priceOrder]);

  const handleSortChange = (e) => {
    setPriceOrder(e.target.value);
  };

  return (
    <Box sx={{ width: 250, p: 3, bgcolor: '#FB8500', position: 'sticky', top: 2, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Filter</Typography>

        <FormControl fullWidth sx={{ mb: 3, bgcolor: '#fff', mt: 4  }}>
          <InputLabel >Sort by Price</InputLabel>
          <Select
            value={priceOrder || ''}
            label="Sort by Price"
            onChange={handleSortChange}
          >
            <MenuItem value="">Sort by Price</MenuItem>
            <MenuItem value="asc">Lowest</MenuItem>
            <MenuItem value="desc">Highest</MenuItem>
          </Select>
        </FormControl>
      </Box>

      
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3, mb:15}}>
        <IconButton color="primary" href="https://www.instagram.com" target="_blank">
          <InstagramIcon />
        </IconButton>
        <IconButton color="primary" href="https://www.facebook.com" target="_blank">
          <FacebookIcon />
        </IconButton>
        <IconButton color="primary" href="https://www.twitter.com" target="_blank">
          <TwitterIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Sidebar;
