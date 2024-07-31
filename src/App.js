import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import Notification from './components/UI/Notification';
import { sendData } from './Store/cart-slice';

let isInitial = true;

function App() {
  const cart = useSelector(state => state.cart)
  const toggle = useSelector(state => state.toggle.toggle)
  const notification = useSelector(state => state.toggle.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }
    dispatch(sendData(cart))
  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
        {toggle && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
