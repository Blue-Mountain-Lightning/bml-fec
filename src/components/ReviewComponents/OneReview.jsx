import React, { useState, useEffect } from 'react';

const OneReview = (props) => {
  const [fullReview, setFullReview] = useState('hi');
  const [summary, setSummary] = useState('hi');

  useEffect(() => { //set text.
    setFullReview(props.review);
    // const summ = fullReview.substring(0, 60);
    // console.log('SUMMARY CHEKC !', summ);
    // setSummary(fullReview.substring(0, 60));
  })
  const shorten = props.text ? props.text.substring(0, 60) : 'empty string';
  return (
    <div>

      <p className="summary">{summary}</p>
      <p>---------------------------------</p>
      <p className="fullReview">{fullReview}</p>
      <p className="dateReviewed">{props.data}</p>

    </div>
  );
}
export default OneReview;