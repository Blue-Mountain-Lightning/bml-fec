import React, { useState, useEffect } from 'react';
import './Stars.css';
const Stars = (props) => {

  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || props.rating) ? "on" : "off"}
            onClick={() => { props.setRating(index); }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(props.rating)}
          >
            <span className="star" >&#9734;</span>
          </button>
        );
      })}
    </div>
  );
}
export default Stars;