import './Carousel.css'
import React, { useState, useEffect } from "react";
import CarouselImage from "./CarouselImage";
import CarouselThumbnailImage from "./CarouselThumbnailImage";
import { FaAngleDown, FaAngleUp, FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const Carousel = ({ photoUrls, productId }) => {
  let [activeSlideIndex, setActiveSlideIndex] = useState(0);
  let [isExpanded, setIsExpanded] = useState(false);
  let numPhotos = photoUrls.length;

  if (numPhotos <= activeSlideIndex) {
    setActiveSlideIndex(0);
  }

  useEffect(() => {
    setActiveSlideIndex(0)
  }, [productId])

  const handleClick = (index) => {
    if (index === numPhotos) {
      index = 0;
    }
    if (index < 0) {
      index = numPhotos - 1;
    }
    setActiveSlideIndex(index);

    const thumbs = document.querySelectorAll('.carousel-thumbnail-grid > .carousel-thumbnail-image');
    if (thumbs.length > 0) {
      thumbs[index].scrollIntoView({ behavior: `smooth`, block: `nearest` })
    }
  }

  const toggleExpandedMode = (event) => {
    const overviewWrapper = document.querySelector('.overview-wrapper')
    const carouselImageWrapper = document.querySelector('.carousel-image-wrapper')
    const thumbnailGrid = document.querySelector('.carousel-thumbnail-grid')
    if (!isExpanded) {
      overviewWrapper.classList.toggle('is-collapsed')
      carouselImageWrapper.style.cursor = 'zoom-out'
      thumbnailGrid.style.borderRadius = '0';
      setIsExpanded(true);
    } else {
      overviewWrapper.classList.toggle('is-collapsed')
      carouselImageWrapper.style.cursor = 'zoom-in'
      thumbnailGrid.style.borderRadius = '20px';
      setIsExpanded(false);
    }
  }

  return (
    <div className="carousel-layout">
      <div className="carousel-thumbnail-wrapper">
        <div className="carousel-thumbnail-grid">
          {!isExpanded && <button className="carousel-button up" onClick={() => handleClick(activeSlideIndex - 1)}><FaAngleUp /></button>}
          {!isExpanded && <button className="carousel-button down" onClick={() => handleClick(activeSlideIndex + 1)}><FaAngleDown /></button>}
          {photoUrls.map((photoUrl, i) => {
            return <CarouselThumbnailImage photoUrl={photoUrl} activeSlideIndex={activeSlideIndex} isExpanded={isExpanded} handleClick={handleClick} alt={`thumbnail-photo-${i}`} index={i} key={photoUrl + i} />
          })}
        </div>
      </div>
      <div className="carousel-image-wrapper">
        <button className="carousel-button prev" onClick={() => handleClick(activeSlideIndex - 1)}><FaAngleLeft /></button>
        <button className="carousel-button next" onClick={() => handleClick(activeSlideIndex + 1)}><FaAngleRight /></button>
        {photoUrls.map((photoUrl, i) => {
          return <CarouselImage photoUrl={photoUrl} isExpanded={isExpanded} toggleExpandedMode={toggleExpandedMode} activeSlideIndex={activeSlideIndex} alt={`style-photo-${i}`} index={i} key={photoUrl + i} />
        }).reverse()}
      </div>
    </div>
  )
}


export default Carousel