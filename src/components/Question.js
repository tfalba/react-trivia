import Confetti from 'react-confetti'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

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
    console.log(submission)
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
            {(question.difficulty !== 'any') && (
              <span className={question.difficulty && (`level-${question.difficulty} answer-block`)}>Level: {question.difficulty.toUpperCase()}</span>
            )}
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
            {(guess === '')
              ? <button className='category-button'>Submit</button>
              : <button className='category-button' onClick={submit}>Submit</button>}
          </div>
        </div>
      </div>
      {submission && (
        <>
          <Modal show={show} onHide={nextQuestion}>
            <Modal.Header closeButton>
              <Modal.Title>{(guess === question.correct_answer)
                ? `Correct!!! Score: ${numberCorrect} of ${idxQuestion + 1}`
                : `Incorrect. Score: ${numberCorrect} of ${idxQuestion + 1}`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{(guess === question.correct_answer)
              ? 'Yes'
              : 'No'}
              , the answer is {question.correct_answer}!
            </Modal.Body>
            <Modal.Footer>
              <Button variant='primary' onClick={nextQuestion}>
                {(idxQuestion < numberQuestions - 1)
                  ? 'Next Question'
                  : 'See Score Summary'}
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
