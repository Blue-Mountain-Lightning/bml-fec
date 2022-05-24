import React, { useState, useEffect } from 'react';

const OneReview = (props) => {
  const [fullReview, setFullReview] = useState('');
  const [summary, setSummary] = useState('hi');

  useEffect(() => {
    setFullReview(props.data.body);
  })

  return (
    <div>
      <p>{fullReview}</p>
      <p>{props.one}</p>

    </div>
  );
}
export default OneReview;