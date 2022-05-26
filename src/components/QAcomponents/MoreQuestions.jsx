import React, {useState} from 'react';
import QuestionsEntry from './QuestionsEntry';
const MoreQuestions = ({questions, product}) => {
  const [collapseQuestins, setCollapseQuestions] = useState(true);
  return (
    <div>
      {collapseQuestins ?
      <>
      <button className='more-questions'
      onClick ={() =>
        setCollapseQuestions(!collapseQuestins)}>
          MORE QUESTIONS
          </button>
          </>
        : <>
        {(questions && questions.length > 4 ) && questions.slice(4).map(question => {
          return (
            <QuestionsEntry question={question} key ={question.question_id}  questionId = {question.question_id} product={product}/>
          )
        })}
        <>
          <button onClick={() => {
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