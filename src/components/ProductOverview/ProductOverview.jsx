import React, { useEffect, useState } from 'react';
import Carousel from './Carousel/Carousel.jsx';
import StyleCircle from './StyleCircle.jsx';
import SizeAndQtySelector from "./SizeAndQtySelector";
import Price from '../Price';
import ShowStarsDupe from './ShowStarsDupe.jsx';
import './ProductOverview.css';


const ProductOverview = ({ product }) => {
  const [loaded, setLoaded] = useState(false);
  const [styles, setStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState({});
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [reviews, setReviews] = useState(undefined);


  useEffect(() => {
    const fetchProductStyles = async () => {
      if (product.id) {
        try {
          const stylesURL = `${process.env.REACT_APP_ENDPOINT}products/${product.id}/styles`;
          const response = await fetch(stylesURL);
          const stylesArray = await response.json();
          setStyles(stylesArray);
          setCurrentStyle(stylesArray.results[0]);
          setCurrentStyleIndex(0)
          setLoaded(true);
        } catch (error) {
          console.log(error);
        }
      }
    }
    const fetchReviews = async () => {
      if (product.id) {
        try {
          const response = await fetch(`${process.env.REACT_APP_ENDPOINT}reviews/?product_id=${product.id}&count=20`);
          const reviews99 = await response.json();
          setReviews(reviews99);
        } catch (err) {
          console.log(err);
        }
      }
    }

    fetchProductStyles();
    fetchReviews();
  }, [product]);


  const getStylesPhotos = () => {
    let photos = []
    for (let style of styles.results) {
      photos.push(style.photos?.[0].thumbnail_url)
    }
    return photos;
  }

  const getPhotoUrlsForCurrentStyle = () => {
    let photos = currentStyle.photos;
    photos = photos.map((photo) => {
      return photo.url
    })
    return photos;
  }

  const handleStylesClick = (index) => {
    setCurrentStyle(styles.results[index]);
    setCurrentStyleIndex(index);
  }

  const handleAddToBag = (event) => {
    event.preventDefault();
    alert(`Chill Dude... it's just a demo, but those ${product.name} do look pretty fly.`)
  }

  if (loaded) {
    const stylesPhotosThumbnailUrls = getStylesPhotos();
    const selectedStylePhotoUrls = getPhotoUrlsForCurrentStyle()
    const skus = currentStyle.skus;

    return (
      <div className="section">
        <div className="container-large">
          <div className="page-padding">
            <div className="product-overview-layout">
              <div className="carousel-wrapper">
                <div>
                  <Carousel photoUrls={selectedStylePhotoUrls} productId={product.id} />
                </div>
              </div>
              <div className="overview-wrapper">
                <ShowStarsDupe data={reviews} />
                <p className="text-all-caps">{product.category}</p>
                <h1 className="product-title">{product.name}</h1>
                <div className="product-price">
                  <Price style={currentStyle} />
                </div>

                <div className="flex">
                  <p className="text-all-caps is-bold mr-pt5">Style ></p>
                  <p className="text-all-caps">{currentStyle.name}</p>
                </div>
                <div className="style-circle-grid mb-1">
                  {stylesPhotosThumbnailUrls.map((url, index) => {
                    return <StyleCircle
                      key={url + index}
                      url={url}
                      index={index}
                      currentStyleIndex={currentStyleIndex}
                      handleStylesClick={handleStylesClick} />
                  })}
                </div>
                <SizeAndQtySelector skus={skus} handleAddToBag={handleAddToBag} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductOverview
