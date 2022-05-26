import React, { useState, useEffect } from 'react';
import './Review.css';
import Stars from './Stars.jsx';
const OneReview = (props) => {
  const [fullReview, setFullReview] = useState('');
  const [summary, setSummary] = useState('hi');
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    setFullReview(props.data.body);
  })

  const sendReq = (req) => {

  }

  const likeIt = () => { //these should pass a req to sendReq.

  }

  const helpful = (event) => {
    //post request with yes/no.

  }

  return (
    <div className="eachReview">
      <b className="summ">{props.data.summary}</b>
      <p className="full">"{fullReview}"</p>


      <p><button className="button-like" onClick={likeIt}>like</button>helpful?
        <button className="button-yes" onClick={helpful} value='yes'>Yes</button>
        <button className="button-no" onClick={helpful}>No</button>
      </p>
      <Stars setRating={setRatings} rating={ratings} />
      <p>Reviewed by: {props.data.reviewer_name} </p>
      <p >date: {props.data.date.substring(0, 10)}</p>
    </div>
  );
}
export default OneReview;