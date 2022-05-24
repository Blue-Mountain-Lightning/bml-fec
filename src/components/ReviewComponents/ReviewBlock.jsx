import React, { useState, useEffect } from 'react';
import OneReview from './OneReview.jsx';

const ReviewBlock = (props) => {
  const [num, setNum] = useState(0);
  const [eachReview, setEach] = useState('');


  useEffect(() => {
    //map the array of object datas, then have show more button, extendable.
    //considering separating requests but probably not necessary.
    setEach(props.data[num]);
  })

  //function to show two at a time.


  return (
    <div>
      <p>-----------------------</p>
      <OneReview data={eachReview}/>

      <p>-----------------------</p>
      <p>show more</p>
    </div>
  );
}
export default ReviewBlock;