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


function ReservationForm({ reservation, setReservation, returnTrip, setReturnTrip, setShowAvailability }) {
  
  const validateNIC = (nic) => {
    const regex = /^(?:\d{9}[a-zA-Z]|\d{12})$/;
    return regex.test(nic);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
       
    if (!validateNIC(reservation.travelerId)) {
      alert('Please enter valid NIC');
      return;
    }

    if (reservation.departure === reservation.arrival) {
      alert('Departure and Arrival stations cannot be the same');
      return;
    }

    if (returnTrip && (reservation.date === reservation.returnDate)) {
      alert('Departure and Return dates cannot be the same');
      return;
    }

    if (returnTrip && (reservation.date > reservation.returnDate)) {
      alert('Return date must be after the departure date');
      return;
    }
  
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
    "Colombo",
    "Kalutara",
    "Amabalangoda",
    "Galle",
    "Weligama",
    "Matara",
    "Beliatta"
  ];

  return (
    <Row>
      <Col>    
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

          <Row>
            <Col>
              <FormGroup controlId="date">
                <FormLabel>Date</FormLabel>
                <FormControl
                  required
                  type="date"
                  name="date"
                  placeholder="Pick Date"
                  value={reservation.date}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 10)}
                  max={new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().slice(0, 10)}
                />
                <Form.Control.Feedback type="invalid">
                  Please pick a date.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>

            <Col className="col-auto">
              <FormCheck
                type="switch"
                id="custom-switch"
                label="Include Return Tickets"
                style={{
                  marginTop: "40px",
                }}
                onChange={() => (setReturnTrip(!returnTrip))}
              />
            </Col>

            {returnTrip && (
              <Col>
                <FormGroup controlId="returnDate">
                  <FormLabel>Return Date</FormLabel>
                  <FormControl
                    required
                    type="date"
                    name="returnDate"
                    placeholder="Pick Return Date"
                    value={reservation.returnDate}
                    onChange={handleChange}
                    min={new Date().toISOString().slice(0, 10)}
                    max={new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().slice(0, 10)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please pick a return date.
                  </Form.Control.Feedback>
                </FormGroup>
              </Col>
            )}            
          </Row>
          
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
      </Col>
    </Row>
  );
};

export default ReservationForm;