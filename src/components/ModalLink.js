import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ModalLink = ({ show, onClick, title, body, secondary, primaryText, secondaryText, answer, repeatQuestions }) => (
  <Modal show={show} onHide={onClick}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}{answer}.</Modal.Body>
    <Modal.Footer>
      <Button variant='primary' onClick={onClick}>
        {primaryText}
      </Button>
      <Button variant={secondary} onClick={repeatQuestions}>
        {secondaryText}
      </Button>
    </Modal.Footer>
  </Modal>

)

export default ModalLink

// saved from questions.js

// {(submission && guess === question.correct_answer && (idxQuestion < numberQuestions - 1)) && (
//   <>
//     <ModalLink show={show} onClick={nextQuestion()} title='Correct!!!' body='Yes, the answer is ' primary='primary' secondary='' primaryText='Next Question' secondaryText='' answer={question.correct_answer} />
//     <Confetti />
//   </>
// )}
// {(submission && guess !== question.correct_answer && (idxQuestion < numberQuestions - 1)) && (
//   <>
//     <ModalLink show={show} onClick={nextQuestion()} title='Incorrect' body='No, the answer is ' secondary='' primaryText='Next Question' secondaryText='' answer={question.correct_answer} />
//   </>
// )}
// {(submission && guess === question.correct_answer && (idxQuestion === numberQuestions - 1)) && (
//   <>
//     <ModalLink show={show} onClick={nextQuestion()} title='Correct!!!' body='Yes, the answer is ' secondary='secondary' primaryText='Return to Categories' secondaryText='Repeat Category Questions' answer={question.correct_answer} repeatQuestions={nextQuestion()} />
//     <Confetti />
//   </>
// )}
// {(submission && guess !== question.correct_answer && (idxQuestion === numberQuestions - 1)) && (
//   <>
//     <ModalLink show={show} onClick={nextQuestion()} title='Incorrect' body='No, the answer is ' secondary='secondary' primaryText='Return to Categories' secondaryText='Repeat Category Questions' answer={question.correct_answer} repeatQuestions={nextQuestion()} />
//   </>
// )}
