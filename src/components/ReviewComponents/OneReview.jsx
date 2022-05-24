import React, { useState, useEffect } from 'react';

const OneReview = (props) => {
  const [fullReview, setFullReview] = useState('');
  const [summary, setSummary] = useState('hi');

  useEffect(() => {
    setFullReview(props.data.body);
  })

  const likeIt = () => {

  }

  const helpYes = () => {

  }

  const helpNo = () => {

  }


  return (
    <div>
      <p>-------------------------------------------</p>
      <b>{props.data.summary}</b>
      <p>"{fullReview}"</p>
      <p>{props.data.date}</p>
      <button onClick={likeIt}>like</button>
      <p>was this helpful?
        <button onClick={helpYes}>Yes</button>
        <button onClick={helpNo}>No</button>
      </p>
      <p>stars: {props.data.rating} / 5</p>
      <p>Reviewed by: {props.data.reviewer_name}</p>
    </div>
  );
}
export default OneReview;