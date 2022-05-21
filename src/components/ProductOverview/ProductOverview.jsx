import React, { useEffect, useState } from 'react';
import Carousel from './Carousel/Carousel.jsx';
import StyleCircle from './StyleCircle.jsx';
import './ProductOverview.css';


const ProductOverview = ({ product }) => {
  const [loaded, setLoaded] = useState(false);
  const [styles, setStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState({});
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);

  useEffect(() => {
    const fetchProductStyles = async () => {
      if (product.id) {
        try {
          let headers = { headers: { 'Authorization': process.env.REACT_APP_TOKEN } }
          const stylesURL = `${process.env.REACT_APP_API}products/${product.id}/styles`;
          const response = await fetch(stylesURL, headers);
          const stylesArray = await response.json();
          setStyles(stylesArray);
          setCurrentStyle(stylesArray.results[0]);
          setLoaded(true);
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchProductStyles();
  }, [product.id]);

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

  if (loaded) {
    const selectedStyleId = currentStyle.style_id;
    //console.log(currentStyle)
    const stylesPhotosThumbnailUrls = getStylesPhotos();
    //console.log(styles.results)
    //console.log('styles', styles)
    //console.log('currentStyle', currentStyle)
    //console.log('selectedStyle', styles.results[currentStyleIndex])
    const selectedStylePhotoUrls = getPhotoUrlsForCurrentStyle()

    return (
      <div className="section">
        <div className="container-large">
          <div className="page-padding">
            <div className="product-overview-grid">
              <div className="">
                <div className="carousel-image-wrapper">
                  <Carousel photoUrls={selectedStylePhotoUrls} />
                  {/* {stylesPhotosThumbnailUrls.map((photoUrl, index) => {
                    return <CarouselImage photoUrl={photoUrl} alt={product.name} index={index} currentStyleIndex={currentStyleIndex} />
                  }).reverse()} */}
                </div>
              </div>
              <div className="">
                <span>Star Component here</span>
                <p className="text-all-caps">{product.category}</p>
                <h2>{product.name}</h2>
                <h3>{product.price}</h3>
                <div className="flex">
                  <p className="text-all-caps is-bold">Style > </p>
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
                <form name="product-overview-form" className="product-overview-form">
                  <select name="size" id="size-select">
                    <option value="">--Select Size--</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                  <select name="quantity" id="quantity-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <button>Add to bag</button>
                  <button>♡</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductOverview
