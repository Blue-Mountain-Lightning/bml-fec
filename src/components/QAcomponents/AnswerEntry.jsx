import React from 'react';
import AnswerPhotos from './AnswerPhotos.jsx';
import moment from 'moment';
const AnswerEntry = (props) => {
  return (
    <div>
      <span>A: {props.answer.body}</span>
      <div>
        by {`${props.answer.answerer_name}`}, {`${moment.utc(props.answer.date).format('MMM Do, YYYY')} |`}
        <div>
          {props.answer.photos.length ? props.answer.photos.map((photo, id) =>
             (<AnswerPhotos photo ={photo} key ={id}/>
          )) : null}
        </div>
      </div>
      <br/>
    </div>
  )
}
export default AnswerEntry;