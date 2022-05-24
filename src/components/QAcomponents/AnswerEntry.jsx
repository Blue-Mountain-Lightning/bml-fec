import React from 'react';
import AnswerPhotos from './AnswerPhotos.jsx';
import AnswerHelpful from './AnswerHelpful.jsx';
import moment from 'moment';
const AnswerEntry = ({answer, answerId}) => {
  return (
    <div>
      <div><b>A:&nbsp;</b>{answer.body}</div>
      <div>
        {answer.photos.length ? answer.photos.map((photo, index) =>
            (<AnswerPhotos photo ={photo} key ={index}/>
        )) : null}
      </div>
      <table>
        <tbody>
          <tr>
            <td>
            by {answer.answerer_name.toLowerCase() === 'seller' ? <b>Seller</b> : answer.answerer_name}, {`${moment.utc(answer.date).format('MMM D, YYYY')} |`}
            </td>
            <td>
            <AnswerHelpful answerId ={answerId} answerHelpfulness={answer.helpfulness}/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default AnswerEntry;