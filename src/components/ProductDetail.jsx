import React from 'react';
import ProductOverview from './ProductOverview';
import RelatedProducts from './RelatedProducts';
import QuestionsAnswers from './QuestionsAnswers';
import Reviews from './ReviewComponents/Reviews';
import {useParams} from 'react-router-dom';
import { useFetch } from '../lib/useFecth.js';

const ProductDetail = () => {
  let params = useParams();
  let product  = useFetch(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${params.productId}`)
  product = JSON.parse(product.data)
  console.log(product)

  return (
    <div>
      <h1>This is the Product Detail Component with id: {params.productId}</h1>
      <h2>Product name is to be determined</h2>
      <ProductOverview />
      <RelatedProducts />
      <QuestionsAnswers />
      <Reviews />
    </div>
  )
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