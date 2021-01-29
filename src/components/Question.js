import { useState } from 'react'
import Confetti from 'react-confetti'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

// import ModalLink from './ModalLink'
// import { chooseAnswer, nextQuestion, submit } from '../question-functions'

function Question ({ question, setQuestion, idxQuestion, numberQuestions, numberCorrect, countCorrect, setCategory, setQuestions, isCategory, questions }) {
  const [guess, setGuess] = useState('')
  const [submission, submitAnswer] = useState(false)
  const [show, setShow] = useState(false)

  function chooseAnswer (answer) {
    if (!submission) {
      setGuess(answer)
    }
  }
  function nextQuestion () {
    console.log(show)

    setShow(false)
    console.log(show)
    setQuestion(idxQuestion + 1)
    submitAnswer(false)
    if (idxQuestion === numberQuestions - 1) {
      returnToCategory(null, [])
    }
  }
  function returnToCategory (categoryOption, questionsOption) {
    setCategory(categoryOption)
    setQuestions(questionsOption)
    setQuestion(0)
    countCorrect(0)
  }

  function submit () {
    console.log({ numberCorrect })
    console.log(guess)
    console.log(question.correct_answer)
    if (guess === question.correct_answer) {
      countCorrect(numberCorrect + 1)
    } else {
      countCorrect(numberCorrect)
    }
    console.log(numberCorrect)
    console.log(show)
    submitAnswer(true)
    // HandleShow()

    // setShow(true)
    console.log(show)
    setShow(true)

    // if (idxQuestion === numberQuestions - 1) {
    //   let scheduledFunction = false
    //   if (scheduledFunction) {
    //     clearTimeout(scheduledFunction)
    //   }
    //   scheduledFunction = setTimeout(function () { setShow(true) }, 2000)
    // }
  }
  const [previousShow, setPreviousShow] = useState()
  const [previousSubmission, setPreviousSubmission] = useState()
  const [previousGuess, setPreviousGuess] = useState()
  // const [previousCount, setPreviousCount] = useState()
  if (show !== previousShow) {
    setShow(show)
    setPreviousShow(show)
  }

  if (submission !== previousSubmission) {
    submitAnswer(submission)
    setPreviousSubmission(submission)
  }
  if (guess !== previousGuess) {
    setGuess(guess)
    setPreviousGuess(guess)
  }
  // if (numberCorrect !== previousCount) {
  //   countCorrect(numberCorrect)
  //   setPreviousCount(numberCorrect)
  // }
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
        <>
          <Modal show={show} onHide={nextQuestion}>
            <Modal.Header closeButton>
              <Modal.Title>Correct!!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Yes, the answer is {question.correct_answer}!</Modal.Body>
            <Modal.Footer>
              <Button variant='primary' onClick={nextQuestion}>
                Next Question
              </Button>
            </Modal.Footer>
          </Modal>
          <Confetti />
        </>
      )}
      {(submission && guess !== question.correct_answer && (idxQuestion < numberQuestions - 1)) && (
        <>
          <Modal show={show} onHide={nextQuestion}>
            <Modal.Header closeButton>
              <Modal.Title>Incorrect</Modal.Title>
            </Modal.Header>
            <Modal.Body>No, the answer is {question.correct_answer}!</Modal.Body>
            <Modal.Footer>
              <Button variant='primary' onClick={nextQuestion}>
                Next Question
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      {(submission && guess === question.correct_answer && (idxQuestion === numberQuestions - 1)) && (
        <>
          <Modal show={show} onHide={nextQuestion}>
            <Modal.Header closeButton>
              <Modal.Title>Correct!!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Yes, the answer is {question.correct_answer}!</Modal.Body>
            <Modal.Footer>
              <Button variant='primary' onClick={nextQuestion}>
                Return to Categories
              </Button>

              <Button variant='secondary' onClick={nextQuestion}>
                Repeat Category Questions?
              </Button>
            </Modal.Footer>
          </Modal>
          <Confetti />
        </>
      )}
      {(submission && guess !== question.correct_answer && (idxQuestion === numberQuestions - 1)) && (
        <>
          <Modal show={show} onHide={nextQuestion}>
            <Modal.Header closeButton>
              <Modal.Title>Incorrect</Modal.Title>
            </Modal.Header>
            <Modal.Body>No, the answer is {question.correct_answer}!</Modal.Body>
            <Modal.Footer>
              <Button variant='primary' onClick={nextQuestion}>
                Return to Categories
              </Button>

              <Button variant='secondary' onClick={nextQuestion}>
                Repeat Category Questions?
              </Button>
            </Modal.Footer>
          </Modal>
          <Confetti />
        </>
      )}
      {/* {(submission && guess === question.correct_answer && (idxQuestion < numberQuestions - 1)) && (
        <>
          <ModalLink show={show} onClick={nextQuestion()} title='Correct!!!' body='Yes, the answer is ' primary='primary' secondary='' primaryText='Next Question' secondaryText='' answer={question.correct_answer} repeatQuestions='' />
          <Confetti />
        </>
      )}
      {(submission && guess !== question.correct_answer && (idxQuestion < numberQuestions - 1)) && (
        <>
          <ModalLink show={show} onClick={nextQuestion()} title='Incorrect' body='No, the answer is ' secondary='' primaryText='Next Question' secondaryText='' answer={question.correct_answer} repeatQuestions='' />
        </>
      )}
      {(submission && guess === question.correct_answer && (idxQuestion === numberQuestions - 1)) && (
        <>
          <ModalLink show={show} onClick={nextQuestion()} title='Correct!!!' body='Yes, the answer is ' secondary='secondary' primaryText='Return to Categories' secondaryText='Repeat Category Questions' answer={question.correct_answer} repeatQuestions={nextQuestion()} />
          <Confetti />
        </>
      )}
      {(submission && guess !== question.correct_answer && (idxQuestion === numberQuestions - 1)) && (
        <>
          <ModalLink show={show} onClick={nextQuestion()} title='Incorrect' body='No, the answer is ' secondary='secondary' primaryText='Return to Categories' secondaryText='Repeat Category Questions' answer={question.correct_answer} repeatQuestions={nextQuestion()} />
        </>
      )} */}
    </div>
  )
}

export default Question
