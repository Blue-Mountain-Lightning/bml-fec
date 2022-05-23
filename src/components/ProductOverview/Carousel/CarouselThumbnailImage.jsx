import React, { useEffect, useRef } from "react";

const CarouselThumbnailImage = ({ photoUrl, activeSlideIndex, handleClick, index, alt }) => {

  const thumb = useRef();
  let className = "carousel-thumbnail-image"
  if (activeSlideIndex === index) {
    className += " current";
  }

  // useEffect(() => {
  //   const thumbDiv = document.querySelector('.carousel-thumbnail-grid');
  //   const selectedThumb = document.querySelector('.carousel-thumbnail-image.current');
  //   if (!thumbDiv) return;
  //   if (!selectedThumb) return;
  //   const thumbDivRect = thumbDiv.getBoundingClientRect();
  //   const selectedThumbRect = selectedThumb.getBoundingClientRect();

  //   thumbDiv.scrollTo(thumbDivRect.x, thumbDivRect.y + selectedThumbRect.y)

  //   console.log('thumbDivRect.y: ', thumbDivRect.y);
  //   console.log('selectedThumbRect.y: ', selectedThumbRect.y)
  // })

  useEffect(() => {
    if (!thumb.current.classList.contains('current')) return
    const thumbDiv = document.querySelector('.carousel-thumbnail-grid');
    if (!thumbDiv) return;

    const selectedThumbRect = thumb.current.getBoundingClientRect();
    const thumbDivRect = thumbDiv.getBoundingClientRect();
    console.log(selectedThumbRect.y - selectedThumbRect.height)

    thumbDiv.scrollTo({ left: 0, top: selectedThumbRect.y - selectedThumbRect.height, behavior: 'smooth' })

  })



  return (
    <img ref={thumb} className={className} src={photoUrl} alt={alt} onClick={() => handleClick(index)} />
  )
}

export default CarouselThumbnailImage