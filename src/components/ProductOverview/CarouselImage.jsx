import React from "react";

const CarouselImage = ({ photoUrl, index, currentStyleIndex, alt }) => {

  let className = "carousel-image"

  if (currentStyleIndex === index) {
    className += " current";
  }

  return (
    <img className={className} src={photoUrl} alt={alt} />
  )
}

export default CarouselImage