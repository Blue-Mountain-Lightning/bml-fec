import React, { useState, useEffect } from 'react';
import OneReview from './OneReview.jsx';

const ReviewBlock = (props) => {
  if (props.data === undefined) {
    return;
  }


  return (
    <div>
      <b>-the review block-</b>
      <div>
        {
          props.data.map((review) => {
            return (
              <OneReview key={review.review_id} data={review}/>
            );

          })
        }
      </div>
      <b>-end review block-</b>
    </div>


  );
};

  //function to show two at a time.
export default ReviewBlock;
// return (

//   {/* <div>
//           {
//             props.data.map((review) => {
//               console.log('TESTEST', review.review_id);
//               if (review.review_id === props.data[props.num].review_id) {
//                 return null;
//               }
//               return (
//                 <OneReview key={review.review_id} data={review}/>
//               );

//             })
//           }
//         </div> */}
// )