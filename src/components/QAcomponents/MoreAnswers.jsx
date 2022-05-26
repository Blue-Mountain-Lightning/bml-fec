import React, {useState} from 'react';
import AnswerEntry from './AnswerEntry';
const MoreAnswers = ({answers}) => {
  const [collapseAnswers, setCollapseAnswers] = useState(true);
  console.log('answers', answers.slice(2));
  return (
    <div>
      {collapseAnswers ?
      <>
      <span className='more-answers'
        onClick ={() =>
        setCollapseAnswers(!collapseAnswers)}>
          MORE ANSWERS
          </span>
          </>
        : <>
        {(answers && answers.length >=3 ) && answers.slice(2).map(answer => {
          return (
            <AnswerEntry answer={answer} key={answer.answer_id} answerId={answer.answer_id}/>
          )
        })}
        <>
          <span className='more-answers'
          onClick={() => {
            setCollapseAnswers(!collapseAnswers)
          }}>
            Collapse Answers
          </span>
        </>
        </>
    }
    </div>

  )
}
export default MoreAnswers;