import React from "react";

const CarouselImage = ({ photoUrl, activeSlideIndex, index, alt }) => {

  let className = "carousel-image"
  if (activeSlideIndex === index) {
    className += " current";
  }

  return (
    <img className={className} src={photoUrl} alt={alt} />
  )
}

export default CarouselImage