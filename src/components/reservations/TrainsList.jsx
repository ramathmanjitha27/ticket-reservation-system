import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import ConfirmModal from './ConfirmModal';

function TrainsList({ departure, arrival, date, ticketClass, ticketCount, travelerId, trains }) {
  const [show, setShow] = useState(false);
  const modalHeading = "Reservation Summary";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    // Post reservation here!
    setShow(false)
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>      
            <th>Train Name</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Ticket Class</th>
            <th>Ticket Count</th>
            <th>Confirmation</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.id}>
              <td>{train.name}</td>
              {train.schedules.filter((schedule) => schedule.station === departure).map((station) => (
                <td>{station.departureTime}</td>
              ))}
              {train.schedules.filter((schedule) => schedule.station === arrival).map((station) => (
                <td>{station.arrivalTime}</td>
              ))}
              <td>{ticketClass}</td>
              <td>{ticketCount}</td>
              <td><Button variant="primary" onClick={handleShow}>
                Reserve
              </Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmModal modalHeading={modalHeading} show={show} handleClose={handleClose} handleConfirm={handleConfirm} />
    </>  
  );
}

export default TrainsList;