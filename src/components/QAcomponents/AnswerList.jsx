import React from 'react';
import AnswerEntry from './AnswerEntry.jsx';
import MoreAnswers from './MoreAnswers.jsx';
const AnswerList = (props) => {
  let orderedAnswers = Object.values(props.answers).sort((a, b) => {
    if (b.helpfulness < a.helpfullness) {
      return -1;
    } else if (a.helpfulness < b.helpfullness) {
      return 1;
    } else {
      return 0;
    }
  });
  // let mostHelpful = orderedAnswers[0];
  // orderedAnswers.shift();
  //console.log('....', orderedAnswers);
  return (
    // <div>
    //   {Object.values(props.answers).map((answer, index) => {
    //     return (
    //       <AnswerEntry answer ={answer} key ={index} />
    //       )

    //   })}
    // </div>
    <div>
      {orderedAnswers.slice(0, 2).map((answer, i) => {
        if (i >= 2) {
          return <MoreAnswers answers={orderedAnswers} key={i} />
        }
        return <AnswerEntry answer={answer} key={i} />
      })}
    </div>
  )
}
export default AnswerList;