import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { AiOutlineArrowRight } from 'react-icons/ai';

function CheckAvailability({ reservation, returnTrip }) {

  const TRAINS = [
    {
        "id": "6524379fb42b75b9309e688c",
        "name": "Train 1",
        "departureStation": "Maradana",
        "arrivalStation": "Galle",
        "date": "2023-10-08T18:30:00Z",
        "isActive": true,
        "isPublished": true,
        "departureTime": "10:00",
        "arrivalTime": "12:00",
        "availableDates": [
            "Monday",
            "Tuesday",
            "Saturday",
            "Sunday"
        ],
        "ticketsAvailability": [
            {
                "trainClass": "First Class",
                "tickets": 10,
                "reserved": 5
            },
            {
                "trainClass": "Second Class",
                "tickets": 20,
                "reserved": 10
            }
        ],
        "schedules": [
            {
                "station": "Maradana",
                "arrivalTime": "10:00",
                "departureTime": "10:15"
            },
            {
                "station": "Kandy",
                "arrivalTime": "11:00",
                "departureTime": "11:15"
            },
            {
                "station": "Galle",
                "arrivalTime": "12:00",
                "departureTime": "12:15"
            }
        ]
    }
]

const RETURNTRAINS = [
  {
      "id": "6524379fb42b75b9309e688c",
      "name": "Train 1",
      "departureStation": "Mahiyanganaya",
      "arrivalStation": "Colombo",
      "date": "2023-10-08T18:30:00Z",
      "isActive": true,
      "isPublished": true,
      "departureTime": "10:00",
      "arrivalTime": "12:00",
      "availableDates": [
          "Monday",
          "Tuesday",
          "Saturday",
          "Sunday"
      ],
      "ticketsAvailability": [
          {
              "trainClass": "First Class",
              "tickets": 10,
              "reserved": 5
          },
          {
              "trainClass": "Second Class",
              "tickets": 20,
              "reserved": 10
          }
      ],
      "schedules": [
          {
              "station": "Galle",
              "arrivalTime": "10:00",
              "departureTime": "10:15"
          },
          {
              "station": "Kandy",
              "arrivalTime": "11:00",
              "departureTime": "11:15"
          },
          {
              "station": "Maradana",
              "arrivalTime": "12:00",
              "departureTime": "12:15"
          }
      ]
  }
]


  return (
    <Row className="justify-content-center">
      <Col className="col-auto">
        <h6 style={{
          marginTop: "40px",
          marginBottom: "40px"
        }}>
            Train Availability
        </h6>
        <Tabs
          defaultActiveKey="oneWayTrip"
          id="uncontrolled-tab-example"
          className="mb-3"
        >   
          <Tab eventKey="oneWayTrip" title="One Way Trip">
            <h5>{reservation.departure} <AiOutlineArrowRight /> {reservation.arrival}</h5>
            <p>Date: {reservation.date}</p>
          </Tab>   
          <Tab eventKey="returnTrip" title="Return Trip" disabled={returnTrip ? false : true}>
            <h5>{reservation.arrival} <AiOutlineArrowRight /> {reservation.departure}</h5>
            <p>Date: {reservation.returnDate}</p>
          </Tab>       
        </Tabs>
      </Col>
    </Row>
  );
}

export default CheckAvailability;