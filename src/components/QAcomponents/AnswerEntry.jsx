import React from 'react';
import AnswerPhotos from './AnswerPhotos.jsx';
import AnswerHelpful from './AnswerHelpful.jsx';
import moment from 'moment';
const AnswerEntry = ({answer, answerId}) => {
  return (
    <div className='answer-container'>
      <div>
        <span className='answer-A'>A:</span>
        <span className='answer-body'>{answer.body}&nbsp;</span>
      </div>
      {answer.photos.length ?
      <div className='photo-div'>
        {answer.photos.length ? answer.photos.map((photo, index) =>
          (<AnswerPhotos photo ={photo} key ={index}/>
        )) : null}
        </div>
        : null}
      <div className='answer-footer'>
        <div>
          by {answer.answerer_name.toLowerCase() === 'seller' ? <b>Seller</b> : answer.answerer_name}, {`${moment.utc(answer.date).format('MMM D, YYYY')}`} &nbsp;|
          <span>
         <AnswerHelpful answerId ={answerId} answerHelpfulness={answer.helpfulness}/>
        </span>
        </div>
      </div>
    </div>
  )
}
export default AnswerEntry;