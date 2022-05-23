import './Carousel.css'
import React, { useState } from "react";
import CarouselImage from "./CarouselImage";
import CarouselThumbnailImage from "./CarouselThumbnailImage";

const Carousel = ({ photoUrls }) => {
  let [activeSlideIndex, setActiveSlideIndex] = useState(0);

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
    <div className="carousel-grid">
      <div className="carousel-thumbnail-grid">
        <button className="button up" onClick={() => handleClick(activeSlideIndex - 1)}>&#8593;</button>
        <button className="button down" onClick={() => handleClick(activeSlideIndex + 1)}>&#8595;</button>
        {photoUrls.map((photoUrl, i) => {
          return <CarouselThumbnailImage photoUrl={photoUrl} activeSlideIndex={activeSlideIndex} handleClick={handleClick} alt={`thumbnail-photo-${i}`} index={i} key={photoUrl + i} />
        })}
      </div>

      <div className="carousel-image-wrapper">
        <button className="button prev" onClick={() => handleClick(activeSlideIndex - 1)}>&#8249;</button>
        <button className="button next" onClick={() => handleClick(activeSlideIndex + 1)}>&#8250;</button>
        {photoUrls.map((photoUrl, i) => {
          return <CarouselImage photoUrl={photoUrl} activeSlideIndex={activeSlideIndex} alt={`style-photo-${i}`} index={i} key={photoUrl + i} />
        }).reverse()}
      </div>
    </div>

  )
}


export default Carousel