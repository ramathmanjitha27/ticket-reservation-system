import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormSelect,
  Button,
  Row, 
  Col,
} from "react-bootstrap";


function ReservationForm() {
  const [reservation, setReservation] = useState({
    departure: "",
    arrival: "",
    date: new Date(),
    time: "",
    ticketCount: 0,
    ticketClass: "",
    trainId: "",
    travellerId: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new reservation object with the form data.
    const newReservation = {
      ...reservation,
    };

    // Send the new reservation object to the server to be created.
    // ...

    // Clear the form.
    setReservation({
      departure: "",
      arrival: "",
      date: new Date(),
      time: "",
      ticketCount: 0,
      ticketClass: "",
      trainId: "",
      travellerId: "",
    });
  };

  const handleChange = (event) => {
    setReservation({
      ...reservation,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Row>
      <Col>    
        <Form onSubmit={handleSubmit}>

          <FormGroup controlId="travelerId">
            <FormLabel>Traveler NIC</FormLabel>
            <FormControl
              type="text"
              name="travelerId"
              value={reservation.travelerId}
              onChange={handleChange}
            />
          </FormGroup>

          {/* <FormGroup controlId="departure">
            <FormLabel>Departure Station</FormLabel>
            <FormControl
              type="text"
              name="departure"
              value={reservation.departure}
              onChange={handleChange}
            />
          </FormGroup> */}

          <FormGroup controlId="departure">
           <FormLabel>Departure Station</FormLabel>
           <FormSelect aria-label="Default select example">
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
           </FormSelect>
          </FormGroup>
         
          {/* <FormGroup controlId="arrivalStation">
            <FormLabel>Arrival Station</FormLabel>
            <FormControl
              type="text"
              name="arrivalStation"
              value={train.arrivalStation}
              onChange={handleChange}
            />
          </FormGroup> */}

          <FormGroup controlId="arrival">
           <FormLabel>Arrival Station</FormLabel>
           <FormSelect aria-label="Default select example">
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
           </FormSelect>
          </FormGroup>

          <FormGroup controlId="date">
            <FormLabel>Date</FormLabel>
            <FormControl
              type="date"
              name="date"
              value={reservation.date}
              onChange={handleChange}
            />
          </FormGroup>

          {/* <FormGroup controlId="availableDates">
            <FormLabel>Available Dates</FormLabel>
            <FormControl
              as="select"
              name="availableDates"
              multiple
              value={train.availableDates}
              onChange={handleAvailableDatesChange}
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </FormControl>
          </FormGroup> */}

          
          <FormGroup controlId="ticketClass">
           <FormLabel>Ticket Class</FormLabel>
           <FormSelect aria-label="Default select example">
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
           </FormSelect>
          </FormGroup>

          <FormGroup controlId="ticketCount">
           <FormLabel>Number of Tickets</FormLabel>
           <FormSelect aria-label="Default select example">
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
           </FormSelect>
          </FormGroup>

          

          {/* <FormGroup controlId="schedules">
            <FormLabel>Schedules</FormLabel>
            {train.schedules.map((schedule, index) => (
              <Row key={index} className="align-items-center">
                <Col>
                  <FormGroup controlId={`station-${index}`}>
                    <FormLabel>Station</FormLabel>
                    <FormControl
                      type="text"
                      name="station"
                      value={schedule.station}
                      onChange={(e) =>
                        handleScheduleChange(e, index, "station")
                      }
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup controlId={`arrivalTime-${index}`}>
                    <FormLabel>Arrival Time</FormLabel>
                    <FormControl
                      type="time"
                      name="arrivalTime"
                      value={schedule.arrivalTime}
                      onChange={(e) =>
                        handleScheduleChange(e, index, "arrivalTime")
                      }
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup controlId={`departureTime-${index}`}>
                    <FormLabel>Departure Time</FormLabel>
                    <FormControl
                      type="time"
                      name="departureTime"
                      value={schedule.departureTime}
                      onChange={(e) =>
                        handleScheduleChange(e, index, "departureTime")
                      }
                    />
                  </FormGroup>
                </Col>
                <Col className="col-auto">
                  <Button
                    variant="danger"
                    onClick={() => deleteSchedule(index)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            ))}
            <Row>
              <Col className="my-3">
                <Button variant="secondary" onClick={addSchedule}>
                  Add Schedule
                </Button>
              </Col>
            </Row>
          </FormGroup> */}
          <Row className="justify-content-center">
            <Col className="col-auto my-4">
              <Button type="submit">Check Availability</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default ReservationForm;