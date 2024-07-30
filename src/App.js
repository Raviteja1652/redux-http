import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const cart = useSelector(state => state.cart)
  const toggle = useSelector(state => state.toggle.toggle)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.put('https://api-calls-prep-default-rtdb.firebaseio.com/cart-http.json', cart);
        const data = await res.data
        console.log(data)
      } catch (error) {
        console.log(error)
      };
    };
    fetchData()
  }, [cart])

  return (
    <Layout>
      {toggle && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
