import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import axios from 'axios';
import Notification from './components/UI/Notification';
import { toggleActions } from './Store/toggle-slice';

let init_notif = true;

function App() {
  const cart = useSelector(state => state.cart)
  const toggle = useSelector(state => state.toggle.toggle)
  const notification = useSelector(state => state.toggle.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      dispatch(toggleActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart Data!'
      }));
      
      const res = await axios.put('https://api-calls-prep-default-rtdb.firebaseio.com/cart-http.json', cart);
      const data = await res.data
      console.log(data)

      dispatch(toggleActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent Data Successfully'
      }))
    };

    if (init_notif) {
      init_notif = false
      return
    }

    fetchData().catch(err => {
      dispatch(toggleActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Sending Data Failed'
      }))
    })
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
