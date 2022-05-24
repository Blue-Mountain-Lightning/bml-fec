import React, { useState, useEffect } from 'react';

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
    console.log(event.target.value);
    //post request with yes/no.

  }


  return (
    <div>
      <p>-------------------------------------------</p>
      <b>{props.data.summary}</b>
      <p>"{fullReview}"</p>
      <p>{props.data.date}</p>
      <button onClick={likeIt}>like</button>
      <p>was this helpful?
        <button onClick={helpful} value='yes'>Yes</button>
        <button onClick={helpful}>No</button>
      </p>
      <p>stars: {props.data.rating} / 5</p>
      <p>Reviewed by: {props.data.reviewer_name}</p>
    </div>
  );
}
export default OneReview;