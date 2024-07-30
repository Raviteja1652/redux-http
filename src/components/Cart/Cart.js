import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItems = useSelector(state => state.cart.items )

  const cartList = cartItems.map(list => (
    <CartItem key={list.id}
      item={{ title: list.title, quantity: list.quantity, total: list.totalPrice, price: list.price, id: list.id }}
    />
  ));

  return (
    <Card className={classes.cart}> 
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartList}
      </ul>
    </Card>
  );
};

export default Cart;
