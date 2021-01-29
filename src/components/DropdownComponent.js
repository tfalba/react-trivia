import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const DropdownComponent = ({ onSelect, eventKey1, eventKey2, eventKey3, eventKey4, title }) => (
  <DropdownButton
    className='levels'
    alignRight
    title={title}
    id='dropdown-basic'
    onSelect={onSelect}
  >
    <Dropdown.Item eventKey={eventKey1}>{eventKey1.toUpperCase()}</Dropdown.Item>
    <Dropdown.Item eventKey={eventKey2}>{eventKey2.toUpperCase()}</Dropdown.Item>
    <Dropdown.Item eventKey={eventKey3}>{eventKey3.toUpperCase()}</Dropdown.Item>
    <Dropdown.Item eventKey={eventKey4}>{eventKey4.toUpperCase()}</Dropdown.Item>
  </DropdownButton>
)

export default DropdownComponent
