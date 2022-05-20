import React, { useState, useEffect } from 'react';
//import {useFetch} from '../lib/useFecth.js'
import { Outlet } from "react-router-dom";
import ProductCard from './ProductCard.jsx';
import './styles/Styles.css'

const ProductList = () => {
  const [products, setProducts] = useState([])
  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products'

  useEffect(() => {
    fetch(url, { headers: { 'Authorization': process.env.REACT_APP_TOKEN } })
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
  }, [])

  return (
    <div className="page-padding">
      <div className="container">
        <h1>Product List</h1>
        <div className="products-grid">
          {products.map((product, index) => {
            return <ProductCard key={product.id + index} product={product} />
          })}
        </div>
      </div>
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