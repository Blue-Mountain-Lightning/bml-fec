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

    const selectedThumbRect = thumbnailRef.current.getBoundingClientRect();
    const thumbDivRect = thumbDiv.getBoundingClientRect();

    thumbnailRef.current.scrollIntoView({ behavior: `smooth`, block: `nearest` });

    // thumbDiv.scrollTo({ left: 0, top: selectedThumbRect.y - selectedThumbRect.height, behavior: 'smooth' })

  })



  return (
    <img ref={thumbnailRef} className={className} src={photoUrl} alt={alt} onClick={() => handleClick(index)} />
  )
}

export default CarouselThumbnailImage