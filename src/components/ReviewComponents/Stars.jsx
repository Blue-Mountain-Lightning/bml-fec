import React, { useState, useEffect } from 'react';
import './Stars.css';
import { BsStar, BsStarFill } from "react-icons/bs";

const Stars = (props) => {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button type="button" key={index}

          className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => {alert(index); setRating(index);}}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}>

            <span className="star">&#9733;</span>

          </button>
        );
      })}
    </div>
  );
}
export default Stars;