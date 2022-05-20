import React, { useState, useEffect } from 'react';
import OneReview from './OneReview.jsx';

function ReviewBlock(props) {
  const [values, setValues] = useState({

  })


  //should take a list from props and use map to return each individual review.
  const eachReview = props.list.map((review) => (
    <li>
      <OneReview thisReview={review} />
    </li>
  ));

  return eachReview;
}




export default ReviewBlock;