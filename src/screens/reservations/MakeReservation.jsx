import React, { useState } from "react";
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

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

  return (
    <Row className="justify-content-center">
      <Col className="col-6">
        <h2 style={{
          marginTop: "90px",
          marginBottom: "30px"
        }}>
            Reserve Train Tickets
        </h2>
        {showAvailability ? (
          <>
          <CheckAvailability reservation={reservation} returnTrip={returnTrip}/>
          <Button onClick={() => setShowAvailability(false)}>Return to Reservation Form</Button>
          </>
        ) : (
          <ReservationForm reservation={reservation} setReservation={setReservation} returnTrip={returnTrip} setReturnTrip={setReturnTrip} setShowAvailability={setShowAvailability}/>
        )}
      </Col>
    </Row>
  )
}

export default MakeReservation;

