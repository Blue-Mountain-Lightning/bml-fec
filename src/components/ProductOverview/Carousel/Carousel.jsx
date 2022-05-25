import './Carousel.css'
import React, { useState, useEffect } from "react";
import CarouselImage from "./CarouselImage";
import CarouselThumbnailImage from "./CarouselThumbnailImage";
import { FaAngleDown, FaAngleUp, FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const Carousel = ({ photoUrls, productId }) => {
  let [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    setActiveSlideIndex(0)
  }, [productId])

  const handleClick = (index) => {
    if (index === photoUrls.length) {
      index = 0;
    }
    if (index < 0) {
      index = photoUrls.length - 1;
    }
    setActiveSlideIndex(index);
  }

  return (
    <div className="carousel-layout">
      <div className="carousel-thumbnail-wrapper">
        <div className="carousel-thumbnail-grid">
          <button className="carousel-button up" onClick={() => handleClick(activeSlideIndex - 1)}><FaAngleUp /></button>
          <button className="carousel-button down" onClick={() => handleClick(activeSlideIndex + 1)}><FaAngleDown /></button>
          {photoUrls.map((photoUrl, i) => {
            return <CarouselThumbnailImage photoUrl={photoUrl} activeSlideIndex={activeSlideIndex} handleClick={handleClick} alt={`thumbnail-photo-${i}`} index={i} key={photoUrl + i} />
          })}
        </div>
      </div>
      <div className="carousel-image-wrapper">
        <button className="carousel-button prev" onClick={() => handleClick(activeSlideIndex - 1)}><FaAngleLeft /></button>
        <button className="carousel-button next" onClick={() => handleClick(activeSlideIndex + 1)}><FaAngleRight /></button>
        {photoUrls.map((photoUrl, i) => {
          return <CarouselImage photoUrl={photoUrl} activeSlideIndex={activeSlideIndex} alt={`style-photo-${i}`} index={i} key={photoUrl + i} />
        }).reverse()}
      </div>
    </div>
  )
}


export default Carousel