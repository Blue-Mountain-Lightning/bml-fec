import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const HEADERS = {headers: {'Authorization': process.env.REACT_APP_TOKEN}};

const ProductCard = ({product}) => {
  const [loaded, setLoaded] = useState(false);
  const [styles, setStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState({});

  useEffect(() => {
    const fetchProductStyles = async () => {
      try {
        const stylesURL = `${process.env.REACT_APP_API}products/${product.id}/styles`;
        const response = await fetch(stylesURL, HEADERS);
        const stylesArray = await response.json();
        setStyles(stylesArray);
        setCurrentStyle(stylesArray.results[0]);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProductStyles();
  }, [product.id]);

  const parsePrice = (productStyle) => {
    // Eventually this will become a separate component
    return `$${productStyle.original_price}`;
  }

  if (loaded) {
    return (
      <div style={{"display": "flex", "flexDirection": "column"}}>
        <img src={currentStyle.photos[0].thumbnail_url} alt='' style={{"height": "360px", "width": "240px", "objectFit": "cover"}}/>
        <div>{product.category}</div>
        <Link to={`/${product.id}`} key={product.id}>{product.name}</Link>
        <div>{parsePrice(currentStyle)}</div>
        <div>Star rating component</div>
      </div>
    )
  }
}

export default ProductCard;
