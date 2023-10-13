import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Row, 
  Col,
} from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';


function TravelDetails() {
  const [nic, setNic] = useState("");
  // const [history, setHistory] = useState([]);
  // const [upcoming, setUpcoming] = useState([]);

  const history = [
    {
      id: "123",
      departure: "Colombo",
      arrival: "Galle",
      date: "2023-09-12",
      time: "09:40",
      ticketCount: 2,
      ticketClass: "Second Class",
      trainId: "12T",
      travelerId: "445565465V",
    },
    {
      id: "123",
      departure: "Galle",
      arrival: "Colombo",
      date: "2023-09-15",
      time: "12:40",
      ticketCount: 2,
      ticketClass: "Second Class",
      trainId: "12T",
      travelerId: "445565465V",
    },
  ];

  const upcoming = [
    {
      id: "123",
      departure: "Colombo",
      arrival: "Galle",
      date: "2023-11-12",
      time: "09:40",
      ticketCount: 2,
      ticketClass: "Second Class",
      trainId: "12T",
      travelerId: "445565465V",
    },
    {
      id: "123",
      departure: "Galle",
      arrival: "Colombo",
      date: "2023-11-15",
      time: "12:40",
      ticketCount: 2,
      ticketClass: "Second Class",
      trainId: "12T",
      travelerId: "445565465V",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
  
   // get travel details - history
   // get travel details - upcoming
  };
  

  return (
    <Row className="justify-content-center">
      <Col className="col-9">
        <h2 style={{
          marginTop: "90px",
          marginBottom: "30px"
        }}>
            Traveler Reservation Details
        </h2>        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <FormGroup controlId="nic">
                {/* <FormLabel>Traveler NIC</FormLabel> */}
                <FormControl
                  required
                  type="text"
                  name="nic"
                  placeholder="Enter Traveler NIC"
                  style={{marginTop: "1.5px"}}
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid NIC.
                </Form.Control.Feedback>
              </FormGroup>
            </Col>
            <Col>
              <Button type="submit" style={{marginBottom: "30px"}}>View travel details</Button>
              {/* <Button type="submit">View travel details</Button> */}
            </Col>
          </Row>          
        </Form>
        <Tabs
          defaultActiveKey="upcoming"
          id="upcoming"
          className="mb-3"
        >   
          <Tab eventKey="upcoming" title="Upcoming Reservations">
            <Table striped bordered hover>
              <thead>
                <tr>    
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Date</th>
                  <th>Time of Departure</th>
                  <th>Train ID</th>
                  <th>Ticket Class</th>
                  <th>Ticket Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((trip) => (
                  <tr key={trip.id}>
                    <td>{trip.departure}</td>
                    <td>{trip.arrival}</td>
                    <td>{trip.date}</td>
                    <td>{trip.time}</td>
                    <td>{trip.trainId}</td>
                    <td>{trip.ticketClass}</td>
                    <td>{trip.ticketCount}</td>
                    <td>
                      <Row>
                        <Col>
                          <Button variant="primary" onClick={() => {
                            console.log("update")
                          }}>
                            <AiFillEdit />
                          </Button>
                        </Col>
                        <Col>
                          <Button variant="danger" onClick={() => {
                            console.log("delete")
                          }}>
                            <AiFillDelete />
                          </Button>
                        </Col>
                      </Row>                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>   
          <Tab eventKey="history" title="Travel History">
            <Table striped bordered hover>
              <thead>
                <tr>    
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Date</th>
                  <th>Time of Departure</th>
                  <th>Train ID</th>
                  <th>Ticket Class</th>
                  <th>Ticket Count</th>
                </tr>
              </thead>
              <tbody>
                {history.map((trip) => (
                  <tr key={trip.id}>
                    <td>{trip.departure}</td>
                    <td>{trip.arrival}</td>
                    <td>{trip.date}</td>
                    <td>{trip.time}</td>
                    <td>{trip.trainId}</td>
                    <td>{trip.ticketClass}</td>
                    <td>{trip.ticketCount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>            
          </Tab>       
        </Tabs>            
      </Col>
    </Row>
  );
}

export default TravelDetails;