import React, { useEffect, useRef } from "react";

const CarouselThumbnailImage = ({ photoUrl, activeSlideIndex, handleClick, index, alt }) => {

  const thumbnailRef = useRef();
  let className = "carousel-thumbnail-image"
  if (activeSlideIndex === index) {
    className += " current";
  }

  useEffect(() => {
    if (!thumbnailRef.current.classList.contains('current')) return
    const thumbDiv = document.querySelector('.carousel-thumbnail-grid');
    if (!thumbDiv) return;
    thumbnailRef.current.scrollIntoView({ behavior: `smooth`, block: `nearest` });
  })



  return (
    <img ref={thumbnailRef} className={className} src={photoUrl} alt={alt} onClick={() => handleClick(index)} />
  )
}

export default CarouselThumbnailImage