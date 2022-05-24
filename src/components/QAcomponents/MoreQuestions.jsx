import React, {useState} from 'react';
import QuestionsEntry from './QuestionsEntry';
const MoreQuestions = ({questions}) => {
  const [collapseQuestins, setCollapseQuestions] = useState(true);
  return (
    <div>
      {collapseQuestins ?
      <>
      <button onClick ={() =>
        setCollapseQuestions(!collapseQuestins)}>
          MORE QUESTIONS
          </button>
          </>
        : <>
        {(questions && questions.length > 4 ) && questions.slice(4).map(question => {
          return (
            <QuestionsEntry question={question} key ={question.question_id}/>
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