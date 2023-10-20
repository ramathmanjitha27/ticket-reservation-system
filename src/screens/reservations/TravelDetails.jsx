import React, { useState } from "react";
import {Link } from "react-router-dom";
import {
  Form,
  FormGroup,
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
import { useReservation } from "../../hooks/api/useReservation";


function TravelDetails() {
  const [nic, setNic] = useState("");
  const modalDelete = "Delete Reservation";
  const [show, setShow] = useState(false);
  const [reservationInfo, setReservationInfo] = useState({});
  const [history, setHistory] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [resId, setResId] = useState("");

  const { getTravelHistoryById, getUpcomingTravelById, deleteReservation } = useReservation();

  // get travel details - history
  const fetchTravelHistory = async () => {
    const data = await getTravelHistoryById(nic);
    setHistory(data);
  }

   // get travel details - upcoming
   const fetchUpcomingTravel = async () => {
    const data = await getUpcomingTravelById(nic);
    setUpcoming(data);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // get travel details - history
    fetchTravelHistory();

    // get travel details - upcoming
    fetchUpcomingTravel();
  };

 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = async () => {
    // delete reservation here
    const responseData = await deleteReservation(resId);

    // update train ticket count

    alert(responseData);
    setShow(false)
    // get travel details - upcoming
    fetchUpcomingTravel();
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
        <p>Reservation updates and deletes must be made at least 5 days before reserved date.</p>  
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
                  {/* <th>Train ID</th> */}
                  <th>Ticket Class</th>
                  <th>Ticket Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.length && upcoming.map((trip) => {
                  const today = new Date();
                  const reservationDate = new Date(trip.date);
                  const differenceInDays = Math.floor((reservationDate - today) / (1000 * 60 * 60 * 24));

                  return (
                    <tr key={trip.id}>
                      <td>{trip.departure}</td>
                      <td>{trip.arrival}</td>
                      <td>{trip.date.split("T")[0]}</td>
                      <td>{trip.time}</td>
                      {/* <td>{trip.trainId}</td> */}
                      <td>{trip.ticketClass}</td>
                      <td>{trip.ticketCount}</td>
                      <td>
                        <Row>
                          <Col>
                            <Link 
                              style={{pointerEvents: (differenceInDays < 5) ? 'none' : ''}}
                              to="/reservations/update" 
                              state={{trip: trip}}                                              
                            >
                              {/* <Button variant="primary" onClick={() => {
                                setReservationInfo({...trip});  
                              }}> */}
                              <Button
                                variant="primary"   
                                disabled={differenceInDays < 5}                             
                              >  
                                <AiFillEdit />
                              </Button>
                            </Link>  
                          </Col>
                          <Col>
                            <Button 
                              variant="danger" 
                              onClick={() => {  
                                setReservationInfo({...trip}); 
                                setResId(trip.id);                                                    
                                handleShow();               
                              }}
                              disabled={differenceInDays < 5}
                            >
                              <AiFillDelete />
                            </Button>
                          </Col>
                        </Row>                     
                      </td>
                    </tr>
                  )
                })}
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
                  {/* <th>Train ID</th> */}
                  <th>Ticket Class</th>
                  <th>Ticket Count</th>
                </tr>
              </thead>
              <tbody>
                {history && history.map && history.map((trip) => (
                  <tr key={trip.id}>
                    <td>{trip.departure}</td>
                    <td>{trip.arrival}</td>
                    <td>{trip.date.split("T")[0]}</td>
                    <td>{trip.time}</td>
                    {/* <td>{trip.trainId}</td> */}
                    <td>{trip.ticketClass}</td>
                    <td>{trip.ticketCount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>            
          </Tab>       
        </Tabs> 
        <ConfirmModal modalHeading={modalDelete} show={show} handleClose={handleClose} handleConfirm={handleConfirm} reservationInfo={reservationInfo} redBtn={true}/>
      </Col>
    </Row>
  );
}

export default TravelDetails;