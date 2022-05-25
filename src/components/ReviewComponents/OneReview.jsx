import React, { useState, useEffect } from 'react';
import './Review.css';
const OneReview = (props) => {
  const [fullReview, setFullReview] = useState('');
  const [summary, setSummary] = useState('hi');

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
      <p>stars: {props.data.rating} / 5</p>
      <p>Reviewed by: {props.data.reviewer_name} date:{props.data.date}</p>
    </div>
  );
}
export default OneReview;