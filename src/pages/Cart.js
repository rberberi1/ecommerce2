import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, itemCount, calculateTotalPrice, increase, decrease, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-container">
      <div className='shopping-cart-price-box'>
      <h2 className="cart-title">Shopping Cart</h2>
      <p className="cart-summary">Products: {itemCount}</p>
      <p className="cart-summary">Total Price: ${calculateTotalPrice.toFixed(2)}</p>
      </div>
      <div>
        { itemCount >0 ?( 
      <ul className="cart-items-list">
        {cartItems.map(item => (
          <li key={item.id} className="cart-item">
            <div className="cart-item-details">
              <Link to={`/products/${item.id}`}><span className="cart-item-name">{item.name}</span></Link>
              <span className="cart-item-quantity">{item.quantity} x ${item.price.toFixed(2)}</span>
            </div>
            <div className="cart-item-actions">
              <button className="cart-button" onClick={() => increase(item.id)}>+</button>
              <button className="cart-button" onClick={() => decrease(item.id)}>-</button>
              <button className="cart-button remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
        ): <p className="cart-items-list">Your cart is empty.</p>
      }
      </div>
    </div>
  );
}

export default Cart;
