import React from "react";

const CarouselImage = ({ photoUrl, activeSlideIndex, index, alt }) => {

  let className = "carousel-image"
  if (activeSlideIndex === index) {
    className += " current";
  }

  const mouseEnter = (event) => {
    console.log(event);
    event.target.classList.add('is-zoomed');
  }

  const mouseLeave = (event) => {
    event.target.classList.remove('is-zoomed');
  }

  const mouseMoveZoom = (event) => {
    if (!event.target.classList.contains('is-zoomed')) return;
    const rect = event.target.getBoundingClientRect();
    //TODO account for button widths
    const left = (event.clientX - rect.x) / (rect.width) * 100;
    const top = (event.clientY - rect.y) / (rect.height) * 100;
    event.target.style.transformOrigin = `${left}% ${top}%`
    event.target.style.objectPosition = `${left}% ${top}%`
  }

  const openExapandedView = (event) => {
    const overviewWrapper = document.querySelector('.overview-wrapper')
    //const carouselImage = document.querySelector('.carousel-image')
    event.target.classList.toggle('is-expanded')
    overviewWrapper.classList.toggle('is-collapsed')
  }

  return (
    <img onClick={openExapandedView} onMouseLeave={mouseLeave} onMouseEnter={mouseEnter} onMouseMove={mouseMoveZoom} className={className} src={photoUrl} alt={alt} />
  )
}

export default CarouselImage