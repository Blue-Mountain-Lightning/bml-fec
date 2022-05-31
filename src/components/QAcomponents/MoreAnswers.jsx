import React, {useState} from 'react';
import AnswerEntry from './AnswerEntry';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
const MoreAnswers = ({answers}) => {
  const [collapseAnswers, setCollapseAnswers] = useState(true);
  return (
    <div className='scrollbar'>
      {collapseAnswers ?
      <>
      <span className='more-answers'
        onClick ={() =>
        setCollapseAnswers(!collapseAnswers)}>
          <FaChevronDown /> See more answers
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
            <FaChevronUp /> Collapse Answers
          </span>
        </>
        </>
    }
    </div>

  )
}
export default MoreAnswers;