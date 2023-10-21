import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { AiOutlineArrowRight } from 'react-icons/ai';

import TrainsList from './TrainsList';
import { useReservation } from '../../hooks/api/useReservation';

function CheckAvailability({ reservation, returnTrip, modalHeading }) {

  const [trains, setTrains] = useState([]); // for one way trip
  const [returnTrains, setReturnTrains] = useState([]); // for return trip
  const { getTrainAvailability } = useReservation();


  const getAvailabilityDetails = async () => {   
    const trainData = await getTrainAvailability(reservation.departure, reservation.arrival, reservation.date, reservation.ticketClass, reservation.ticketCount);
    setTrains(trainData);
    
    if(returnTrip) {
      const returnTrainData = await getTrainAvailability(reservation.arrival, reservation.departure, reservation.returnDate, reservation.ticketClass, reservation.ticketCount);
      setReturnTrains(returnTrainData);      
    }
  }    

  // get train avaialbility from the backend
  useEffect(() => {
    getAvailabilityDetails();
  }, []);

   
  return (
    <Row className="justify-content-center">
      <Col className="col-auto">
        {/* <h6 style={{
          marginTop: "40px",
          marginBottom: "40px"
        }}>
            Train Availability
        </h6> */}
        <Tabs
          defaultActiveKey="oneWayTrip"
          id="uncontrolled-tab-example"
          className="mb-3"
        >   
          <Tab eventKey="oneWayTrip" title="One Way Trip">
            <h5>{reservation.departure} <AiOutlineArrowRight /> {reservation.arrival}</h5>
            <p>Date: {reservation.date.split("T")[0]}</p>
            <TrainsList departure={reservation.departure} arrival={reservation.arrival} date={reservation.date} reservation={reservation} trains={trains} modalHeading={modalHeading}/>
          </Tab>   
          <Tab eventKey="returnTrip" title="Return Trip" disabled={returnTrip ? false : true}>
            <h5>{reservation.arrival} <AiOutlineArrowRight /> {reservation.departure}</h5>
            <p>Date: {reservation.returnDate}</p>
            <TrainsList  departure={reservation.arrival} arrival={reservation.departure} date={reservation.returnDate} reservation={reservation} trains={returnTrains} modalHeading={modalHeading}/>
          </Tab>       
        </Tabs>
      </Col>
    </Row>
  );
}

export default CheckAvailability;