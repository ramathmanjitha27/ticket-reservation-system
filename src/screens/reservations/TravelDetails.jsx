import React, { useState } from "react";
import {Link } from "react-router-dom";
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

import ConfirmModal from '../../components/reservations/ConfirmModal';


function TravelDetails() {
  const [nic, setNic] = useState("");
  const modalDelete = "Delete Reservation";
  const [show, setShow] = useState(false);
  const [reservationInfo, setReservationInfo] = useState({});
  const [testInfo, setTestInfo] = useState({test: "ok"}); 
  // const [history, setHistory] = useState([]);
  // const [upcoming, setUpcoming] = useState([]);


  // get travel details - history
  // get travel details - upcoming

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
      id: "1234",
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
      id: "12345",
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
      id: "123456",
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

 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    // Delete reservation here
    setShow(false)
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
                          <Link to="/reservations/update" state={{trip: trip}}>
                            {/* <Button variant="primary" onClick={() => {
                              setReservationInfo({...trip});  
                            }}> */}
                            <Button>  
                              <AiFillEdit />
                            </Button>
                          </Link>  
                        </Col>
                        <Col>
                          <Button variant="danger" onClick={() => {  
                            setReservationInfo({...trip});                         
                            handleShow();               
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
        <ConfirmModal modalHeading={modalDelete} show={show} handleClose={handleClose} handleConfirm={handleConfirm} reservationInfo={reservationInfo} />
      </Col>
    </Row>
  );
}

export default TravelDetails;