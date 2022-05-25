import React, { useState, useEffect } from "react";

const CarouselImage = ({ photoUrl, isExpanded, toggleExpandedMode, activeSlideIndex, index, alt }) => {

  let className = "carousel-image"
  if (activeSlideIndex === index) {
    className += " current";
  }

  // const mouseEnter = (event) => {
  //   event.target.classList.add('is-zoomed');
  // }

  const mouseLeave = (event) => {
    event.target.style.transform = 'scale(1)';
    event.target.style.transformOrigin = `50% 50%`
    event.target.style.objectPosition = `50% 50%`
  }

  const mouseMoveZoom = (event) => {
    if (!isExpanded) return;
    event.target.style.transform = 'scale(2.5)'
    const rect = event.target.getBoundingClientRect();
    const left = (event.clientX - rect.x) / (rect.width) * 100;
    const top = (event.clientY - rect.y) / (rect.height) * 100;
    event.target.style.transformOrigin = `${left}% ${top}%`
    event.target.style.objectPosition = `${left}% ${top}%`
  }

  return (
    <img onClick={toggleExpandedMode} onMouseMove={mouseMoveZoom} onMouseLeave={mouseLeave} className={className} src={photoUrl} alt={alt} />
  )
}

export default CarouselImage