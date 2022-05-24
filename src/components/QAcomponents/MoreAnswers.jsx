import React, {useState} from 'react';
import AnswerEntry from './AnswerEntry';
const MoreAnswers = ({answers}) => {
  const [collapseAnswers, setCollapseAnswers] = useState(true);
  console.log('answers', answers.slice(2));
  return (
    <div>
      {collapseAnswers ?
      <>
      <button onClick ={() =>
        setCollapseAnswers(!collapseAnswers)}>
          MORE ANSWERS
          </button>
          </>
        : <>
        {(answers && answers.length >=3 ) && answers.slice(2).map(answer => {
          return (
            <AnswerEntry answer={answer} key={answer.answer_id}/>
          )
        })}
        <>
          <button onClick={() => {
            setCollapseAnswers(!collapseAnswers)
          }}>
            Collapse Answers
          </button>
        </>
        </>
    }
    </div>

  )
}
export default MoreAnswers;