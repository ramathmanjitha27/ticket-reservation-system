import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal({ modalHeading, show, handleClose, handleConfirm, reservationInfo }) {
  

  return ( 
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {/* <Modal.Title>{modalHeading}</Modal.Title> */}
        <Modal.Title>Reservation Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li>Traveler NIC: {reservationInfo.travelerId}</li>
          <li>Departure: {reservationInfo.departure}</li>
          <li>Arrival: {reservationInfo.arrival}</li>   
          <li>Date: {reservationInfo.date}</li>
          <li>Time of Departure: {reservationInfo.time}</li>       
          <li>Ticket Class: {reservationInfo.ticketClass}</li>
          <li>Ticket Count: {reservationInfo.ticketCount}</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          {/* Confirm Rerservation */}
          {modalHeading}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;