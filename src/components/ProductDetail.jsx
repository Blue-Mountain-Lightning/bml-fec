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
    fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${params.productId}`, { headers: { 'Authorization': process.env.REACT_APP_TOKEN } })
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        //
      })
  }, [params.productId])

  if (product) {
    return (
      <div>
        <h1>This is the Product Detail Component with id: {params.productId}</h1>
        <div data-testid={`product-item-test`}>
          <h2>{product.name}</h2>
        </div>
        <ProductOverview />
        <RelatedProducts />
        <QuestionsAnswers />
        <Reviews />
      </div>
    )
  }
}

// class ProductDetail extends React.Component {
//   constructor() {
//     super();
//   }

//   render() {
//     return (
//       <div>
//         <h1>This is the Product Detail Component</h1>
//         <ProductOverview />
//         <RelatedProducts />
//         <QuestionsAnswers />
//         <Reviews />



//       </div>

//     )
//   }
// }

export default ProductDetail;