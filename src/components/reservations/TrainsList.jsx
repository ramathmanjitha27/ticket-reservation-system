import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import ConfirmModal from './ConfirmModal';

function TrainsList({ departure, arrival, date, reservation, trains, modalHeading }) {
  const [show, setShow] = useState(false);
  const reservationInfo = {
    departure: departure,
    arrival: arrival,
    date: date,
    time: "",
    ticketCount: reservation.ticketCount,
    ticketClass: reservation.ticketClass,
    trainId: "",
    travelerId: reservation.travelerId,
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    if (modalHeading === "Confirm Reservation") {
      // Post reservation here
      // Update train ticket count here
      // {
      //   "departure": "Fort",
      //   "arrival": "Kandy",
      //   "date": "2023-10-22T05:30:00+05:30",
      //   "time": "09:00",
      //   "ticketCount": 2,
      //   "ticketClass": 3,
      //   "trainId": "6523a981cffc6af533a5fe7f",
      //   "travelerId": "6523a981c23c6af5eea5fe7f"
      // }
      
    } else {
      // Update reservation here
      // Update train ticket count here
    }
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
              {train.schedules.filter((schedule) => schedule.station === departure).map((station) => {
                reservationInfo.time = station.departureTime;
                return(
                  <td>{station.departureTime}</td>
                )
              })}
              {train.schedules.filter((schedule) => schedule.station === arrival).map((station) => (
                <td>{station.arrivalTime}</td>
              ))}
              <td>{reservation.ticketClass}</td>
              <td>{reservation.ticketCount}</td>
              <td><Button variant="primary" onClick={() => {
                reservationInfo.trainId = train.id;
                handleShow();
              }}>
                Confirm
              </Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmModal modalHeading={modalHeading} show={show} handleClose={handleClose} handleConfirm={handleConfirm} reservationInfo={reservationInfo} />
    </>  
  );
}

export default TrainsList;