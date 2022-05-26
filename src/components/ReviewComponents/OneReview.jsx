import React, { useState, useEffect } from 'react';
import Stars from './Stars.jsx';
const OneReview = (props) => {
  const [fullReview, setFullReview] = useState('');
  const [summary, setSummary] = useState('hi');
  const [ratings, setRatings] = useState(0);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    setFullReview(props.data.body);
  })

  const sendReq = (req) => {

  }

  const likeIt = (event) => { //these should pass a req to sendReq.
    alert('liked!');

  }

  const helpful = (event) => {
    console.log(event.target.value);
    //post request with yes/no.

  }

  return (

    <div className="eachReview">
      <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"></link>
      <script src="https://kit.fontawesome.com/59748b3a9f.js" crossorigin="anonymous"></script>
      <b className="summ">{props.data.summary}</b>
      <p className="full">{fullReview}</p>

      <div className="eachReviewComponents">
        <p>
          <i class="fa-solid fa-heart" onClick={likeIt} ></i> &nbsp;
          Helpful? &nbsp;<button className="button-yes" onClick={helpful} value='yes'>Yes</button>
          <button className="button-no" onClick={helpful} value='no'>No</button>
        </p>
        <Stars setRating={setRatings} rating={ratings} />
        <p className="reviewer">Reviewed by: {props.data.reviewer_name} </p>
        <p className="dateOfReview">{props.data.date.substring(0, 10)}</p>
      </div>

    </div>
  );
}
export default OneReview;