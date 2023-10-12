import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal({ modalHeading, show, handleClose, handleConfirm }) {
  

  return ( 
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalHeading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li>Traveler NIC: </li>
          <li>Departure: </li>
          <li>Time of Departure: </li>
          <li>Arrival: </li>
          <li>Time of Arrival: </li>
          <li>Date: </li>
          <li>Ticket Class: </li>
          <li>Ticket Count: </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm Rerservation
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;