import React, { useEffect, useRef } from "react";
import { FaDotCircle } from 'react-icons/fa';

const CarouselThumbnailImage = ({ photoUrl, activeSlideIndex, isExpanded, handleClick, index, alt }) => {

  let className = !isExpanded ? "carousel-thumbnail-image" : "thumbnail-dot"
  if (activeSlideIndex === index) {
    className += " current";
  }

  useEffect(() => {
    const thumbs = document.querySelectorAll('.carousel-thumbnail-grid > .carousel-thumbnail-image')
    if (thumbs.length > 0) {
      thumbs[activeSlideIndex].scrollIntoView({ block: `center` })
    }
  }, [isExpanded])

  const displayThumbnail = () => {
    if (!isExpanded) {
      return <img className={className} src={photoUrl} alt={alt} onClick={() => handleClick(index)} />
    } else {
      return <div className={className} onClick={() => handleClick(index)}><FaDotCircle /></div>
    }
  }

  return (
    <>
      {displayThumbnail()}
    </>

  )
}

export default CarouselThumbnailImage