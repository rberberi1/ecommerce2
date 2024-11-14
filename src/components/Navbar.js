import CartIcon from '../assets/icons/cart.svg';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import NightsStay from '@mui/icons-material/NightsStay';
import WbSunny  from '@mui/icons-material/WbSunny';


const Navbar = () => {
  const { cartItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor:'#023047' }}>
    
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: '#FB8500', textDecoration: 'none' }}>
            Store
          </Link>
        </Typography>

  
        <div>
        <Button 
            variant="contained" 
        
            component={Link} 
            to="/add-product" 
            sx={{ marginRight: 2,  backgroundColor: '#FFB703' }}
          >
            Add Product
          </Button>


          <IconButton component={Link} to="/cart" color="#fff" >
            <Badge
              badgeContent={cartItems.length}
              color="error"
              overlap="rectangular"
              sx={{ position: 'relative' }}
            >
              <img src={CartIcon} alt="Shopping cart" style={{ height: '2rem' }} />
            </Badge>
          </IconButton>

    
          <Button onClick={toggleTheme} color="inherit" >
            {theme === 'light' ? <NightsStay /> : <WbSunny />}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
