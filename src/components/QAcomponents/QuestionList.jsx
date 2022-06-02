import React from 'react';
import QuestionsEntry from './QuestionsEntry.jsx';
import MoreQuestions from './MoreQuestions.jsx';
const QuestionList = ({searchInput, questions, product, productId, handleClose, handleOpen, openAdd}) => {
  return (
    <div>
    {
    searchInput === ''
        ?
        questions
          .slice(0, 3)
          .map((question, index) => (
            index > 1
              ? <MoreQuestions
                questions={questions}
                key={question.question_id}
                product={product}
                handleClose={handleClose}
                openAdd={openAdd}
                productId={productId}
                handleOpen={handleOpen}
              />
              : <QuestionsEntry
                question={question}
                questionId = {question.question_id}
                key={question.question_id} product={product}/>
          ))
        :
        questions.filter(question =>
          question.question_body.toLowerCase()
            .includes(searchInput.toLowerCase())
         )
          .slice(0, 3)
          .map((question, index) => (
            index > 1
              ? <MoreQuestions
                questions={questions}
                key={question.question_id}
              />
              : <QuestionsEntry
                question={question}
                questionId = {question.question_id}
                key={question.question_id}
                product={product}
                searchInput={searchInput}
              />
       ))
    }
  </div>
  )
}
export default QuestionList;