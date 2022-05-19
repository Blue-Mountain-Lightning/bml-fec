import React from 'react';
import { Link } from "react-router-dom";

const ProductCard = ({product}) => {
  return (
    <div>
      <Link to={`/${product.id}`} key={product.id}>{product.name}</Link>
    </div>
  )
}

export default ProductCard;