import { useState } from 'react'

function Question (props) {
  const { question } = props
  const { numberQuestions } = props
  const { setQuestion } = props
  const { idxQuestion } = props
  const [guess, setGuess] = useState('')
  const [submission, submitAnswer] = useState(false)
  const { numberCorrect } = props
  const { countCorrect } = props
  // const [numberCorrect, countCorrect] = useState(0)

  function chooseAnswer (answer) {
    if (!submission) {
      setGuess(answer)
    }
  }
  function showResult () {
    setQuestion(idxQuestion + 1)
    submitAnswer(false)
  }

  function submit () {
    console.log(numberCorrect)
    console.log(guess)
    console.log(question.correct_answer)
    if (guess === question.correct_answer) {
      countCorrect(numberCorrect + 1)
    } else {
      countCorrect(numberCorrect)
    }
    console.log(numberCorrect)
    submitAnswer(true)

    // let scheduledFunction = false
    // if (scheduledFunction) {
    //   clearTimeout(scheduledFunction)
    // }
    // scheduledFunction = setTimeout(function () { showResult() }, 4000)
  }

  return (
    <div>
      <div className='flex-sa'>
        <div className=''>
          <h1>Question {`#${idxQuestion + 1}`}</h1>
          <div className='question-title'>{question.question}</div>
          <div className='flex-col answer-block'>{question.shuffledAnswers.map((answer, idx) =>
            <div answer={answer} key={idx} onClick={() => chooseAnswer(answer)} className='flex'>
              <div className={(guess === answer) ? 'circle-fill' : 'circle'} />
              <div>{answer}</div>
            </div>
          )}
          </div>
          <div className='flex'>
            <button className='category-button' onClick={() => submit()}>Submit</button>
            {(idxQuestion > 0) && (
              <button className='category-button' onClick={() => setQuestion(idxQuestion - 1)}>Previous</button>
            )}
            {(idxQuestion < numberQuestions - 1) && (
              <button className='category-button' onClick={() => showResult()}>Next</button>
            )}
          </div>
        </div>
      </div>
      {(submission && guess === question.correct_answer && (idxQuestion < numberQuestions - 1)) && (<div className='answer-prompt'>YES!!! Correct: {numberCorrect}</div>)}
      {(submission && (guess !== question.correct_answer) && (idxQuestion < numberQuestions - 1)) && (<div className='answer-prompt'>NO the correct answer is {question.correct_answer} Correct: {numberCorrect}</div>)}
      {(submission && guess === question.correct_answer && (idxQuestion === numberQuestions - 1)) && (<div className='answer-prompt'>YES!!! COMPLETE</div>)}
      {(submission && (guess !== question.correct_answer) && (idxQuestion === numberQuestions - 1)) && (<div className='answer-prompt'>COMPLETE NO the correct answer is {question.correct_answer}</div>)}
    </div>
  )
}

export default Question
