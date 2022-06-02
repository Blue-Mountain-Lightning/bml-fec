import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import imageNotAvailable from '../../assets/image-not-available.png'
import Price from '../Price';
import ShowStarsDupe from '../ProductOverview/ShowStarsDupe';
import CardButton from './CardButton';
import StyleSwitcher from './StyleSwitcher';

const HEADERS = { headers: { 'Authorization': process.env.REACT_APP_TOKEN } };

const stylesCache = {}; // stores previous style API requests

const ProductCard = ({ product, Icon, iconHandler, iconHandlerClose}) => {
  const navigate = useNavigate();
  const [currentStyle, setCurrentStyle] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [styles, setStyles] = useState([]);
  const [reviewsMeta, setReviewsMeta] = useState([]);
  const [mouseHovering, setMouseHovering] = useState(false);

  const parseFontSize = (size) => {
    return `${size}rem`;
  }

  const fontSize = parseFontSize(1); // the fontsize in rem

  useEffect(() => {
    const fetchProductStyles = async () => {
      try {
        let stylesArray;
        const stylesURL = `${process.env.REACT_APP_API}products/${product.id}/styles`;
        if (stylesCache[stylesURL]) {
          stylesArray = stylesCache[stylesURL];
        } else {
          const response = await fetch(stylesURL, HEADERS);
          stylesArray = await response.json();
          stylesCache[stylesURL] = stylesArray;
        }

        let reviewsArray;
        const reviewsURL = `${process.env.REACT_APP_API}reviews/?product_id=${product.id}&count=20`;
        try {
          if (stylesCache[reviewsURL]) {
            reviewsArray = stylesCache[reviewsURL];
          } else {
          const response = await fetch(reviewsURL, HEADERS);
          reviewsArray = await response.json();
          stylesCache[reviewsURL] = reviewsArray;
          }
        } catch (error) {
          console.log(error);
        }

        setReviewsMeta(reviewsArray);
        setStyles(stylesArray);
        setCurrentStyle(stylesArray.results[0]);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProductStyles();
  }, [product.id]);

  const handleClick = useCallback(() => {
    navigate(`/${product.id}`, { replace: true});
  }, [navigate, product.id])

  const handleStyleClick = (e) => {
    e.stopPropagation();
    setCurrentStyle(styles.results.find(style => (
      String(style.style_id) === e.target.name
    )))
  }

  const handleMouseEnter = (e) => {
    setMouseHovering(true);
  }

  const handleMouseLeave = (e) => {
    setMouseHovering(false);
  }

  const imageExists = () => {
    return (typeof currentStyle.photos[0].thumbnail_url === 'string')
  }

  if (loaded) {
    const isImage = imageExists();
    const image = isImage ?
      currentStyle.photos[0].thumbnail_url : imageNotAvailable;

    let styleSwitcher = (
      <div className='card-style-grid-overlay'>
        <StyleSwitcher
          styles={styles}
          currentStyle={currentStyle}
          handleStyleClick={handleStyleClick}
        />
      </div>
    )

    let buttonIcon = (
      <div className='card-button-icon'>
        <CardButton
          Icon={Icon}
          iconHandler={iconHandler}
          iconHandlerClose={iconHandlerClose}
          product={product}
        />
      </div>
    )

    if (!mouseHovering) {
      styleSwitcher = <div className='card-style-grid-overlay hide'/>;
      buttonIcon = <div className='card-button-icon hide'/>;
    }

    return (
      <div
        className='clickable product-card'
        style={{"fontSize": fontSize}}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='card-styles-parent'>
          <img className='card-styles-thumbnail'
               src={image}
               alt=''
          />
          {isImage ? styleSwitcher : null}
          {buttonIcon}
        </div>
        <div className="text-all-caps">{product.category}</div>
        <b>{product.name}</b>
        <Price style={currentStyle} fontSize={fontSize} />
        <ShowStarsDupe data={reviewsMeta} />
      </div>
    )
  }
}

export default ProductCard;
