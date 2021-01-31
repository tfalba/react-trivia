import Confetti from 'react-confetti'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
// import ModalLink from './ModalLink'

function Question ({
  question, setQuestion, idxQuestion, numberQuestions, numberCorrect, countCorrect,
  setCategory, setQuestions, isCategory, questions, numberEasy, countEasy, numberMedium, countMedium,
  numberHard, countHard, correctEasy, countCorrectEasy, correctMedium, countCorrectMedium,
  correctHard, countCorrectHard, gameComplete, setGameComplete, guess, setGuess, submission, submitAnswer,
  show, setShow
}) {
  function chooseAnswer (answer) {
    if (!submission) {
      setGuess(answer)
    }
  }
  function nextQuestion () {
    setShow(false)
    setQuestion(idxQuestion + 1)
    submitAnswer(false)
    setGuess('')
    if (idxQuestion === numberQuestions - 1) {
      setGameComplete(true)
      setCategory(null)
      setQuestions([])
    }
  }

  function submit () {
  //  How can I make this if block into a separate function?
    if (guess === question.correct_answer) {
      countCorrect(numberCorrect + 1)
      if (question.difficulty === 'easy') {
        countCorrectEasy(correctEasy + 1)
        countEasy(numberEasy + 1)
      } else if (question.difficulty === 'medium') {
        countCorrectMedium(correctMedium + 1)
        countMedium(numberMedium + 1)
      } else {
        countCorrectHard(correctHard + 1)
        countHard(numberHard + 1)
      }
    } else {
      if (question.difficulty === 'easy') {
        countEasy(numberEasy + 1)
      } else if (question.difficulty === 'medium') {
        countMedium(numberMedium + 1)
      } else {
        countHard(numberHard + 1)
      }
    }
    submitAnswer(true)
    setShow(true)
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
              <button className='category-button' onClick={submit}>Submit</button>
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
              <Modal.Title>Correct!!! Score: {numberCorrect} of {idxQuestion + 1}</Modal.Title>
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
              <Modal.Title>Incorrect. Score: {numberCorrect} of {idxQuestion + 1}</Modal.Title>
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
              <Modal.Title>Correct!!! Score: {numberCorrect} of {idxQuestion + 1}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Yes, the answer is {question.correct_answer}!</Modal.Body>
            <Modal.Footer>
              <Button variant='primary' onClick={nextQuestion}>
                See Score Summary
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
              <Modal.Title>Incorrect. Score: {numberCorrect} of {idxQuestion + 1}</Modal.Title>
            </Modal.Header>
            <Modal.Body>No, the answer is {question.correct_answer}!</Modal.Body>
            <Modal.Footer>
              <Button variant='primary' onClick={nextQuestion}>
                See Score Summary
              </Button>
            </Modal.Footer>
          </Modal>
          <Confetti />
        </>
      )}

    </div>
  )
}

export default Question
