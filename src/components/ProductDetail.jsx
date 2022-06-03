import React, { useEffect, useState } from 'react';
import NavBar from "./NavBar/NavBar.jsx";
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import ProductSlogan from "./ProductOverview/ProductSlogan";
import RelatedProducts from './RelatedProducts/RelatedProducts';
import YourOutfit from './RelatedProducts/YourOutfit';
import QuestionsAnswers from './QuestionsAnswers';
import Reviews from './ReviewComponents/Reviews';
import { useParams } from 'react-router-dom';

const ProductDetail = (props) => {
  let params = useParams();
  const [product, setProduct] = useState([])
  const [outfit, setOutfit] = useState([]);

  const handleAddToOutfit = (item) => {
    if (outfit.some(p => p.id === item.id)) {
      alert(`${item.name} already added!`);
      return;
    }

    let updatedOutfit = outfit;
    updatedOutfit.unshift(item);
    setOutfit([...updatedOutfit]);
  }

  const handleRemoveFromOutfit = (item) => {
    let updatedOutfit = outfit;
    updatedOutfit.splice(updatedOutfit.indexOf(p => p.id === item.id), 1);
    setOutfit([...updatedOutfit]);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_ENDPOINT}products/${params.productId}`)
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
        <YourOutfit
          product={product}
          outfit={outfit}
          handleAddToOutfit={handleAddToOutfit}
          handleRemoveFromOutfit={handleRemoveFromOutfit}
        />
        <QuestionsAnswers productId ={params.productId} product={product}/>
        <Reviews id={params.productId}/>
        <div data-testid={`product-item-test`}></div>
      </div>
    )
  }
}

export default ProductDetail;
