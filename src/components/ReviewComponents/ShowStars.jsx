import React, { useState, useEffect } from 'react';
import { ImStarFull, ImStarEmpty, ImStarHalf } from "react-icons/im";
import './Review1.css';

const ShowStars = (props) => {
  const [num, setNum] = useState(0);
  if (props.data === undefined) {
    return;
  }

  let arr = props.data.results;
  console.log('arrayasdfasdfas', arr);
  let avg = 0;
  for ( let i = 0; i < arr.length; i++) {
    avg = arr[i].rating + avg;
  }
  avg = avg / props.data.results.length;


  return (
    <div className="showRatings">
      <h2>Rating: {avg}</h2>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <div className="showingStars">

            {avg > index ? <ImStarFull /> : avg < index && avg > index - 1 ? <ImStarHalf /> : <ImStarEmpty />}
          </div>



        );
      })}
    </div>
  );
}

export default ShowStars;