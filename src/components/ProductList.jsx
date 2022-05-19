import React from 'react';
import {useFetch} from '../lib/useFecth.js'
import { Outlet } from "react-router-dom";
import ProductCard from './ProductCard.jsx';
import './styles/Styles.css'

const ProductList = () => {
  let products = useFetch(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products`)
  products = JSON.parse(products.data) || []
  //console.log(products);

  return (
    <div className="page-padding">
      <div className="container">
        <div className="products-grid">
          {products.map((product) => {
            return <ProductCard key={product.id} product={product}/>
          })}
        </div>
      </div>
      <Outlet/>
    </div>
  )
}

// class ProductList extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       products: [],
//     }
//   }

//   render() {
//     // TODO implement routing
//     // On click of a Product in ProductList, go to ProductDetail
//     return (
//       <h1>This is the Product List Component</h1>
//       // map products to ProductDetail components
//     );
//   }
// }

export default ProductList;