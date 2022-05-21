import './Carousel.css'
import React, { useState } from "react";
import CarouselImage from "./CarouselImage";

const Carousel = ({ photoUrls }) => {
  let [activeSlideIndex, setActiveSlideIndex] = useState(0);

  //let activeSlideIndex = 0;

  const handleClick = (dir) => {
    let temp = activeSlideIndex;
    if (dir === 'next') {
      temp += 1;
      if (temp === photoUrls.length) {
        temp = 0;
      }
    } else {
      temp -= 1;
      if (temp < 0) {
        temp = photoUrls.length - 1;
      }
    }
    setActiveSlideIndex(temp);
  }

  return (
    <div>
      <button className="prev-button" onClick={() => handleClick('prev')}>Prev</button>
      <button className="next-button" onClick={() => handleClick('next')}>Next</button>
      {photoUrls.map((photoUrl, i) => {
        return <CarouselImage photoUrl={photoUrl} activeSlideIndex={activeSlideIndex} alt={`style-photo-${i}`} index={i} key={photoUrl + i} />
      }).reverse()}
    </div>
  )
}


export default Carousel