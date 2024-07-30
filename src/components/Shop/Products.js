import ProductItem from './ProductItem';
import classes from './Products.module.css';

const dummy = [
  {
    id: 'p1',
    title: 'Shirt',
    price: 6,
    description: 'This is a first product - amazing!'
  },
  {
    id: 'p2',
    title: 'Shoes',
    price: 17,
    description: 'This is a second product - amazing!'
  },
  {
    id: 'p3',
    title: 'Hoodie',
    price: 10,
    description: 'This is a third product - amazing!'
  }
]
const Products = (props) => {

  const list = dummy.map(item => {
    return (
      <ProductItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
      />
    )
  })

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {list}
      </ul>
    </section>
  );
};

export default Products;
