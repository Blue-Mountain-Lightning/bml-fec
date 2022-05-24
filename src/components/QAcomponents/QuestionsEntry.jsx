import React from 'react';
import AnswerList from './AnswerList.jsx';
import QuestionHelpful from './QuestionHelpful.jsx';
import AddAnswer from './AddAnswer.jsx';
const QuestionsEntry = ({question, questionId, product}) => {
  return (
  <div className='qa-question'>
    <table>
      <tbody>
        <tr>
          <td>
          <b>Q:&nbsp; {question.question_body}</b>
          </td>
          <td>
          <QuestionHelpful
            helpfulness ={question.question_helpfulness}
            questionId={questionId}
            />
          </td>
          <td>
          <AddAnswer questionBody={question.question_body}
            questionId={questionId}
            product={product}/>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
    <AnswerList questionId ={questionId}/>
    </div>
  </div>)
}
export default QuestionsEntry;