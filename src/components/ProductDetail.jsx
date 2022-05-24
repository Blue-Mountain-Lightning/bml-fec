import React, { useEffect, useState } from 'react';
import NavBar from "./NavBar/NavBar.jsx";
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import ProductSlogan from "./ProductOverview/ProductSlogan";
import RelatedProducts from './RelatedProducts/RelatedProducts';
import QuestionsAnswers from './QuestionsAnswers';
import Reviews from './ReviewComponents/Reviews';
import { useParams } from 'react-router-dom';

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
        <NavBar />
        <ProductOverview product={product} />
        <ProductSlogan product={product} />
        <RelatedProducts product={product} />
        <QuestionsAnswers productId ={params.productId} product={product}/>
        <Reviews />
        <div data-testid={`product-item-test`}></div>
      </div>
    )
  }
}

export default ProductDetail;
