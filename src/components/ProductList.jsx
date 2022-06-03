import React, { useState, useEffect } from 'react';
//import {useFetch} from '../lib/useFecth.js'
import ProductCard from './ProductCard/ProductCard.jsx';
import './styles/Styles.css'

const ProductList = () => {
  const [products, setProducts] = useState([])
  let url = `${process.env.REACT_APP_ENDPOINT}products?count=20`
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
  }, [])

  return (
    <div className="section">
      <div className="page-padding">
        <div className="container-large">

          <h1>Product List</h1>
          <div className="products-grid">
            {products.map((product, index) => {
              return <ProductCard key={product.id + index} product={product} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList;
