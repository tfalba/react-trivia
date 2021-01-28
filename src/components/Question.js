import { useState } from 'react'
import Confetti from 'react-confetti'

function Question (props) {
  const { question } = props
  const { numberQuestions } = props
  const { setQuestion } = props
  const { idxQuestion } = props
  const [guess, setGuess] = useState('')
  const [submission, submitAnswer] = useState(false)
  const { numberCorrect } = props
  const { countCorrect } = props
  const { setCategory } = props
  const { setQuestions } = props
  const { isCategory } = props
  const { questions } = props

  function chooseAnswer (answer) {
    if (!submission) {
      setGuess(answer)
    }
  }
  function showResult () {
    setQuestion(idxQuestion + 1)
    submitAnswer(false)
  }
  function returnToCategory () {
    setCategory(isCategory)
    setQuestions(questions)
    setQuestion(0)
    countCorrect(0)
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
    if (idxQuestion < numberQuestions - 1) {
      let scheduledFunction = false
      if (scheduledFunction) {
        clearTimeout(scheduledFunction)
      }
      scheduledFunction = setTimeout(function () { showResult() }, 2800)
    }
  }

  return (
    <div className={(idxQuestion % 2 === 0) ? 'animate__animated animate__rotateInUpRight question-card' : 'animate__animated animate__rotateInUpLeft question-card'}>
      <div className='flex-sa'>
        <div className=''>
          <h2>Question {`#${idxQuestion + 1}`} of {numberQuestions}
            {(question.difficulty === 'easy') && (
              <span className='level-easy answer-block'>Level: {question.difficulty.toUpperCase()}</span>)}
            {(question.difficulty === 'medium') && (
              <span className='level-medium answer-block'>Level: {question.difficulty.toUpperCase()}</span>)}
            {(question.difficulty === 'hard') && (
              <span className='level-hard answer-block'>Level: {question.difficulty.toUpperCase()}</span>)}
          </h2>
          <div className='question-title'>{question.question}</div>
          <div className='flex-col answer-block'>{question.shuffledAnswers.map((answer, idx) =>
            <div answer={answer} key={idx} onClick={() => chooseAnswer(answer)} className='flex'>
              <div className={(guess === answer) ? 'circle-fill' : 'circle'} />
              <div>{answer}</div>
            </div>
          )}
          </div>
          <div className='flex'>
            {(!submission) && (
              <button className='category-button' onClick={() => submit()}>Submit</button>
            )}
            {submission && (
              <div className='category-button'>Submit</div>
            )}
          </div>
        </div>
      </div>
      {(submission && guess === question.correct_answer && (idxQuestion < numberQuestions - 1)) && (
        <div className='answer-prompt animate__animated animate__fadeIn'>YES!!!
          <div> Correct: {numberCorrect} of {idxQuestion + 1}
          </div>
        </div>)}
      {(submission && (guess !== question.correct_answer) && (idxQuestion < numberQuestions - 1)) && (
        <div className='answer-prompt animate__animated animate__fadeIn'>NO the correct answer is {question.correct_answer}
          <div>Correct: {numberCorrect} of {idxQuestion + 1}
          </div>
        </div>)}
      {(submission && guess === question.correct_answer && (idxQuestion === numberQuestions - 1)) && (
        <div className='answer-prompt animate__animated animate__fadeIn'>YES!!!
          <div> Final Total: {numberCorrect} of {numberQuestions}</div>
          <div className='category-button' onClick={() => returnToCategory()}>Repeat Category?</div>
        </div>)}
      {(submission && (guess !== question.correct_answer) && (idxQuestion === numberQuestions - 1)) && (
        <div className='answer-prompt animate__animated animate__fadeIn'>NO the correct answer is {question.correct_answer}
          <div> Final Total: {numberCorrect} of {numberQuestions}</div>
          <div className='category-button' onClick={() => returnToCategory()}>Repeat Category?</div>
        </div>)}
      {(submission && (numberCorrect === parseInt(numberQuestions))) && (
        <Confetti />
      )}
    </div>
  )
}

export default Question
