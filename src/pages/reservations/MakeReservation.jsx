import React, { useState } from "react";
import { Row, Col } from 'react-bootstrap';
import ReservationForm from '../../components/reservations/ReservationForm';
import CheckAvailability from '../../components/reservations/CheckAvailability';

function MakeReservation() {
  const [reservation, setReservation] = useState({
    departure: "",
    arrival: "",
    date: "",
    returnDate: "",
    time: "",
    ticketCount: 0,
    ticketClass: "",
    trainId: "",
    travelerId: "",
  });
  const [returnTrip, setReturnTrip] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);

  // function handleClick() {    
  //   // Clear the form.
  //   setReservation({
  //     departure: "",
  //     arrival: "",
  //     date: "",
  //     returnDate: "",
  //     time: "",
  //     ticketCount: 0,
  //     ticketClass: "",
  //     trainId: "",
  //     travelerId: "",
  //   });
  // }

  return (
    <Row className="justify-content-center">
      <Col className="col-auto">
        <h1 style={{
          marginTop: "40px",
          marginBottom: "40px"
        }}>
            Reserve Train Tickets
        </h1>
        {showAvailability ? (
          <CheckAvailability reservation={reservation} returnTrip={returnTrip}/>
        ) : (
          <ReservationForm reservation={reservation} setReservation={setReservation} returnTrip={returnTrip} setReturnTrip={setReturnTrip} setShowAvailability={setShowAvailability}/>
        )}
      </Col>
    </Row>
  )
}

export default MakeReservation;

