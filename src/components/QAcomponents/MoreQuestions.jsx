import React, {useState} from 'react';
import QuestionsEntry from './QuestionsEntry';
import AddQuestion from './AddQuestion.jsx';
const MoreQuestions = ({questions, product, productId, handleClose, handleOpen, openAdd}) => {
  const [collapseQuestins, setCollapseQuestions] = useState(true);
  return (
    <div className='scrollbar'>
      {collapseQuestins ?
      <>
      <button className='more-questions-button'
      onClick ={() =>
        setCollapseQuestions(!collapseQuestins)}>
          MORE QUESTIONS
          </button>
          <button className='add-question-button'onClick= {handleOpen}>ADD A QUESTION +</button>
      <AddQuestion handleClose={handleClose} openAdd={openAdd} productId={productId} product={product}/>
          </>
        : <>
        {(questions && questions.length > 4 ) && questions.slice(4).map(question => {
          return (
            <QuestionsEntry question={question} key ={question.question_id}  questionId = {question.question_id} product={product}/>
          )
        })}
        <>
          <button className='collapse-questions-button'
          onClick={() => {
            setCollapseQuestions(!collapseQuestins)
          }}>
            Collapse Questions
          </button>
        </>
        </>
    }
    </div>

  )
}
export default MoreQuestions;