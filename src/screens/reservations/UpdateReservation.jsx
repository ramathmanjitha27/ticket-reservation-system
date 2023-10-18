import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
  Row, 
  Col,
} from "react-bootstrap";

import CheckAvailability from '../../components/reservations/CheckAvailability';


function UpdateReservation() {
  
  const location = useLocation();
  const {trip} = location.state;
  
  const [reservation, setReservation] = useState({...trip});
  const [returnTrip, setReturnTrip] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const modalHeading = "Update Reservation";

  const handleSubmit = (event) => {
    event.preventDefault();
  
    setShowAvailability(true);
  };
  
  const handleChange = (event) => {
    setReservation({
      ...reservation,
      [event.target.name]: event.target.value,
    });
  };

  const stations = [
    "Maradana",
    "Colombo Fort",
    "Kalutara",
    "Amabalangoda",
    "Galle",
    "Weligama",
    "Matara",
    "Beliatta"
  ];

  

  return (
    <Row className="justify-content-center">
      <Col className="col-6">
        <h2 style={{
          marginTop: "90px",
          marginBottom: "30px"
        }}>
            Update Reservation
        </h2>
        {showAvailability ? (
          <>
          <CheckAvailability reservation={reservation} returnTrip={returnTrip} modalHeading={modalHeading}/>
          <Button onClick={() => setShowAvailability(false)}>Return to Update Form</Button>
          </>
        ) : (
          <Form onSubmit={handleSubmit}>

          <FormGroup controlId="travelerId">
            <FormLabel>Traveler NIC</FormLabel>
            <FormControl
              required
              type="text"
              name="travelerId"
              value={reservation.travelerId}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid NIC.
            </Form.Control.Feedback>
          </FormGroup>

          <FormGroup controlId="departure">
            <FormLabel>Departure Station</FormLabel>
            <FormControl
              as="select"
              name="departure"
              value={reservation.departure}
              onChange={handleChange}
            >
              {stations.map((station) => (
                <option key={station} value={station}>
                  {station}
                </option>
              ))}
            </FormControl>
          </FormGroup>
         
          <FormGroup controlId="arrival">
            <FormLabel>Arrival Station</FormLabel>
            <FormControl
              as="select"
              name="arrival"
              value={reservation.arrival}
              onChange={handleChange}
            >
              {stations.map((station) => (
                <option key={station} value={station}>
                  {station}
                </option>
              ))}
            </FormControl>
          </FormGroup>

          <FormGroup controlId="date">
            <FormLabel>Date</FormLabel>
            <FormControl
              required
              type="date"
              name="date"
              placeholder="Pick Date"
              value={reservation.date}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please pick a date.
            </Form.Control.Feedback>
          </FormGroup>
          
          <FormGroup controlId="ticketClass">
            <FormLabel>Ticket Class</FormLabel>
            <FormControl
              as="select"
              name="ticketClass"
              value={reservation.ticketClass}
              onChange={handleChange}
            >
              <option value="First Class">First Class</option>
              <option value="Second Class">Second Class</option>
              <option value="Third Class">Third Class</option>        
            </FormControl>
          </FormGroup>

          <FormGroup controlId="ticketCount">
            <FormLabel>Number of Tickets</FormLabel>
            <FormControl
              as="select"
              name="ticketCount"
              value={reservation.ticketCount}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </FormControl>
          </FormGroup>         
        
          <Row className="justify-content-center">
            <Col className="col-auto my-4">
              <Button type="submit">Check Availability</Button>
            </Col>
          </Row>
        </Form>
        )}
        
      </Col>
    </Row>
  )
}

export default UpdateReservation;

