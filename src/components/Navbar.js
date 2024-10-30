import CartIcon from '../assets/icons/cart.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartCircle from './CartCircle';

const Navbar=()=>{
  const { cartItems } = useContext(CartContext);

  return (

    <nav className='navbar'>
      <Link to="/products">Store</Link>
      <Link to="/cart" >
          <img style={{height:'1.5rem'}}src={CartIcon} alt="Shopping cart" />
          {cartItems.length > 0 && (
                      <CartCircle count={cartItems.length}></CartCircle>
                    )}          
      </Link>
     
    </nav>
  );
}


export default Navbar;