import React, { useState, useEffect } from 'react';
import OneReview from './OneReview.jsx';

const ReviewBlock = (props) => {
  const [num, setNum] = useState({
    number: 0
  });

  useEffect(() => { //map the array of object datas, then have show more button, extendable.
    //considering separating requests but probably not necessary.
    console.log('hi');
  })

  const showReviews = (event) => {
    const reviewOne = props.data[num];
    setNum(num + 1);
    const reviewTwo = props.data[num];
    setNum(num + 1);

    return (
      <div>
        <OneReview data={props.data} currentNum={num}/>
        <OneReview data={props.data} currentNum={num}/>
      </div>

    );
  }

  return (
    <div>
      {showReviews}
      <button onClick={showReviews}>show more</button>
    </div>
  );
}
export default ReviewBlock;