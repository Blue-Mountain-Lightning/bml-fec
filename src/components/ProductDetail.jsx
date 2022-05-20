import React, { useEffect, useState } from 'react';
import ProductOverview from './ProductOverview';
import RelatedProducts from './RelatedProducts';
import QuestionsAnswers from './QuestionsAnswers';
import Reviews from './ReviewComponents/Reviews';
import { useParams } from 'react-router-dom';
import { useFetch } from '../lib/useFecth.js';

const ProductDetail = (props) => {
  let params = useParams();
  const [product, setProduct] = useState([])

  useEffect(() => {
    let headers = { headers: { 'Authorization': process.env.REACT_APP_TOKEN } }
    fetch(`${process.env.REACT_APP_API}products/${params.productId}`, headers)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
      })
  }, [params.productId])

  if (product) {
    return (
      <div>
        {/* <h1>This is the Product Detail Component with id: {params.productId}</h1> */}
        <div data-testid={`product-item-test`}>
          {/* <h2>{product.name}</h2> */}
        </div>
        <ProductOverview product={product} />
        <RelatedProducts product={product} />
        <QuestionsAnswers />
        <Reviews />
      </div>
    )
  }
}

export default ProductDetail;
