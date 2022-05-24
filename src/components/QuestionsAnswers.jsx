import React from 'react';
import QuestionsAndAnswers from './QAcomponents/QuestionsAndAnswers.jsx';
const QuestionsAnswers = ({productId, product}) => {
  return (
    <div className='container'>
      <h2>Questions and Answers</h2>
      <QuestionsAndAnswers productId ={productId} product={product}/>
    </div>
  );
}

export default QuestionsAnswers