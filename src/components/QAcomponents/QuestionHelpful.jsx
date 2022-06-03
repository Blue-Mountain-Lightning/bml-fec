import React, {useState} from 'react';
const QuestionHelpful = ({helpfulness, questionId}) => {
  const [helpfulQuestion, setHelpfulQuestion] = useState(false);
  const [reportToggle, setReportToggle] = useState(false);

  let urlHelpful = `qa/questions/${questionId}/helpful`;
  const handleHelpfulQuestion = () => {
    if (!questionId) {
      return;
      }
    fetch (urlHelpful, {
      method: 'PUT',
      headers: {'Authorization': process.env.REACT_APP_TOKEN},
      })
      .then(() => setHelpfulQuestion(true) )
      .catch(err => alert('Cannot change the helpfulness for this answer'))
  }

  let urlReport = `qa/questions/${questionId}/report`;
  const handleReport = () => {
    if (!questionId) {
      return;
    }
    fetch (urlReport, {
      method: 'PUT',
      headers: {'Authorization': process.env.REACT_APP_TOKEN},
      })
      .then(() => setReportToggle(true) )
      .catch(err => alert('Cannot report this question'))
  }
    return (
    <div className='question-helpful-continer'>
      <div >
        <span>&nbsp;Helpful?&nbsp;</span>
      </div>
      <div className='question-helpful'>
        {!helpfulQuestion ?
        <span onClick={() => handleHelpfulQuestion()}
          className='qa-underline' >&nbsp;Yes</span> : 'Yes'}
          ({helpfulQuestion? helpfulness + 1: helpfulness}) | &nbsp;
        <span
          onClick={(event) => handleReport(event)}
          className='qa-underline'>
          {reportToggle ? 'Reported' : "Report"}
        </span>
        <span> &nbsp;| &nbsp;</span>
      </div>
    </div>
  )

}
export default QuestionHelpful;