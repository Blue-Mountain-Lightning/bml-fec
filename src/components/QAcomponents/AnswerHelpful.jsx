import React, {useState} from 'react';
const AnswerHelpful = ({answerHelpfulness, answerId}) => {
  const [helpfulAnswer, setHelpfulAnswer] = useState(false);
  const [reportToggle, setReportToggle] = useState(false);

  let urlHelpful = `qa/answers/${answerId}/helpful`;
  const handleHelpfulAnswers = () => {
    if (!answerId) {
      return;
      }
    fetch (urlHelpful, {
      method: 'PUT',
      headers: {'Authorization': process.env.REACT_APP_TOKEN},
      body: parseInt(answerId)
      })
      .then(() => setHelpfulAnswer(true) )
      .catch(err => alert('Cannot change the helpfulness for this answer'))
  }
  let urlReport = `qa/answers/${answerId}/report`;
  const handleReport = () => {
    if (!answerId) {
      return;
    }
    fetch (urlReport, {
      method: 'PUT',
      headers: {'Authorization': process.env.REACT_APP_TOKEN},
      })
      .then((data) => {
        setReportToggle(true)
        })
      .catch(err => alert('Cannot report this question'))
  }
    return (
    <div className='answer-helpfulness'>
        <span>Helpful?&nbsp;</span>
        {!helpfulAnswer
        ?
        <span onClick={() => handleHelpfulAnswers()}
        className='qa-underline' >&nbsp;Yes </span>
        : 'Yes'}
        ({helpfulAnswer? answerHelpfulness + 1: answerHelpfulness})
        <span> &nbsp;| &nbsp;</span>
        <span
          onClick={(event) => handleReport(event)}
          className='qa-underline'>
          {reportToggle ? 'Reported' : "Report"}
        </span>
    </div>
  )
}
export default AnswerHelpful;