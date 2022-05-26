import React, { useState, useEffect } from 'react';
import OneReview from './OneReview.jsx';
import './Review1.css';
const ReviewBlock = (props) => {
  if (props.data === undefined) {
    return;
  }
  const newArr = props.data.results.slice(0, props.num);

  return (
    <div className="reviewBlock">
      <div>
        {
          newArr.map((review) => {
            return (
              <OneReview className="eachReview" key={review.review_id} data={review}/>
            );

          })
        }
      </div>
    </div>


  );
};

export default ReviewBlock;