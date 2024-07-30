import { useDispatch, useSelector } from 'react-redux';

import classes from './CartButton.module.css';
import { toggleActions } from '../../Store/toggle-slice';

const CartButton = (props) => {
  const cartQuantity = useSelector(state => state.cart.totalQuantity)
  const dispatch = useDispatch()

  const cartClickHandler = () => {
    dispatch(toggleActions.toggleCart())
  }
  return (
    <button className={classes.button} onClick={cartClickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
