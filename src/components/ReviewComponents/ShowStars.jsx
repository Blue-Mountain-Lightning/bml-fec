import React, { useState, useEffect } from 'react';
import { ImStarFull, ImStarEmpty, ImStarHalf } from "react-icons/im";
import './Review1.css';

const ShowStars = (props) => {
  if (props.data === undefined) {
    return;
  }

  let arr = props.data.results;
  let avg = 0;
  for ( let i = 0; i < arr.length; i++) {
    avg = arr[i].rating + avg;
  }
  avg = avg / props.data.results.length;
  avg = avg.toFixed(1);

  return (
    <div>
      <h2 className="ratingsText">Rating: {avg}</h2>
      <div className="ratings">

        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <div className="showingStars" key={index}>

              {avg > index ? <ImStarFull size={28}/> : avg < index && avg > index - 1 ? <ImStarHalf size={28}/> : <ImStarEmpty size={28}/>}
            </div>



          );
        })}
      </div>
    </div>
  );
}

export default ShowStars;