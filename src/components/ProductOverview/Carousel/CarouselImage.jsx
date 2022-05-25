import React from "react";

const CarouselImage = ({ photoUrl, activeSlideIndex, index, alt }) => {

  let className = "carousel-image"
  if (activeSlideIndex === index) {
    className += " current";
  }

  const openExapandedView = (event) => {
    const carouselThumbnailGrid = document.querySelector('.carousel-thumbnail-grid')
    const overviewContent = document.querySelector('.overview-wrapper')
    const productOverviewGrid = document.querySelector('.product-overview-grid')
    const carouselGrid = document.querySelector('.carousel-grid')
    //const carouselImage = document.querySelector('.carousel-image')
    carouselThumbnailGrid.classList.toggle('display-none')
    overviewContent.classList.toggle('display-none')
    productOverviewGrid.classList.toggle('is-expanded')
    carouselGrid.classList.toggle('is-expanded')
    event.target.classList.toggle('is-expanded')
  }

  return (
    <img onClick={openExapandedView} className={className} src={photoUrl} alt={alt} />
  )
}

export default CarouselImage