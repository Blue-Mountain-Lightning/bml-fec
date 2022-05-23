import React from "react";

const CarouselThumbnailImage = ({ photoUrl, activeSlideIndex, handleClick, index, alt }) => {

  let className = "carousel-thumbnail-image"
  if (activeSlideIndex === index) {
    className += " current";
  }

  return (
    <img className={className} src={photoUrl} alt={alt} onClick={() => handleClick(index)} />
  )
}

export default CarouselThumbnailImage