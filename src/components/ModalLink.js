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
