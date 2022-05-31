import React from 'react';
import QuestionsAndAnswers from './QAcomponents/QuestionsAndAnswers.jsx';
const QuestionsAnswers = ({productId, product}) => {
  return (
    <div className='section'>
      <QuestionsAndAnswers productId ={productId} product={product}/>
    </div>
  );
}

export default QuestionsAnswers