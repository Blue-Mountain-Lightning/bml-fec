import React from 'react';
import AnswerList from './AnswerList.jsx';
import QuestionHelpful from './QuestionHelpful.jsx';
import AddAnswer from './AddAnswer.jsx';
const QuestionsEntry = ({question, questionId, product}) => {
  return(
    <div className='question'>
      <div className='question-container'>
        <div>
          <span className='question-Q'>Q:</span>
          <span className='question-body'>{question.question_body}</span>
        </div>
        <div className='question-footer'>
          <div>
            <QuestionHelpful
              helpfulness ={question.question_helpfulness}
              questionId={questionId}/>
          </div>
          <div>
            <AddAnswer
              questionBody={question.question_body}
              questionId={questionId}
              product={product}/>
          </div>
        </div>
      </div>
      <div className='answer'>
      <AnswerList questionId ={questionId} product={product}/>
      </div>
    </div>
  )
}
export default QuestionsEntry;