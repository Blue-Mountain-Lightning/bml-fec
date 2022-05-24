import React, { useState, useEffect } from 'react';

const OneReview = (props) => {
  const [fullReview, setFullReview] = useState('');
  const [summary, setSummary] = useState('hi');

  useEffect(() => {
    setFullReview(props.data.body);
    console.log(props.data);
  })

  return (
    <div>
      <p>One Review</p>
      <b>{props.data.summary}</b>
      <p>"{fullReview}"</p>
      <p>{props.data.date}</p>
      <p>stars: {props.data.rating}</p>
      <p>By: {props.data.reviewer_name}</p>
    </div>
  );
}
export default OneReview;