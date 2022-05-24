import React, { useState, useEffect } from 'react';
import OneReview from './OneReview.jsx';

const ReviewBlock = (props) => {
  const [num, setNum] = useState(0);
  const [eachReview, setEach] = useState('');


  useEffect(() => {
    //map the array of object datas, then have show more button, extendable.
    //considering separating requests but probably not necessary.
    // console.log(props.data);
    renderTwo();
    // renderTwo();
  })

  //function to show two at a time.
  const renderTwo = (event) => {

    setEach(props.data[num]);

  }

  return (
    <div>

      <div>
        {
          props.data.map((review) => {
            return (
              <OneReview data={review}/>
            );

          })
        }
      </div>

      <button onClick={renderTwo}>show more</button>

    </div>


  );
}
export default ReviewBlock;