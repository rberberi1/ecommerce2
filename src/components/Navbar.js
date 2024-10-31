import CartIcon from '../assets/icons/cart.svg';
import { Link } from 'react-router-dom';
import CartCircle from './CartCircle';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Navbar=()=>{
  const { cartItems } = useCart()
  const {theme, toggleTheme}=useTheme();

  return (

    <nav className='navbar'>
      <div className='navbar-left'>
      <Link to="/">Store</Link>
      </div>

      <div className='navbar-right'>
      <Link to="/cart" >
          <img style={{height:'2rem'}}src={CartIcon} alt="Shopping cart" />
          {cartItems.length > 0 && (
                      <CartCircle count={cartItems.length}></CartCircle>
                    )}          
      </Link>
      <button className='theme-btn' onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
      </div>
     
    </nav>
  );
}


export default Navbar;