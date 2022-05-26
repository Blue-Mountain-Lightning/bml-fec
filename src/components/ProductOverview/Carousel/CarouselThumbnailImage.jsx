import React, { useEffect, useRef } from "react";
import { FaDotCircle } from 'react-icons/fa';

const CarouselThumbnailImage = ({ photoUrl, activeSlideIndex, isExpanded, handleClick, index, alt }) => {

  const thumbnailRef = useRef();

  let className = !isExpanded ? "carousel-thumbnail-image" : "thumbnail-dot"
  if (activeSlideIndex === index) {
    className += " current";
  }

  useEffect(() => {
    if (!thumbnailRef.current.classList.contains('current')) return
    const thumbDiv = document.querySelector('.carousel-thumbnail-grid');
    if (!thumbDiv) return;
    thumbnailRef.current.scrollIntoView({ behavior: `smooth`, block: `nearest` });
  })

  const displayThumbnail = () => {
    if (!isExpanded) {
      return <img ref={thumbnailRef} className={className} src={photoUrl} alt={alt} onClick={() => handleClick(index)} />
    } else {
      return <div ref={thumbnailRef} className={className} onClick={() => handleClick(index)}><FaDotCircle /></div>
    }
  }

  return (
    <>
      {displayThumbnail()}
    </>

  )
}

export default CarouselThumbnailImage