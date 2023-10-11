import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function CheckAvailability({ reservation, returnTrip }) {
  return (
    <Row className="justify-content-center">
      <Col className="col-auto">
        <h1 style={{
          marginTop: "40px",
          marginBottom: "40px"
        }}>
            Train Availability
        </h1>
        <Tabs
          defaultActiveKey="oneWayTrip"
          id="uncontrolled-tab-example"
          className="mb-3"
        >   
          <Tab eventKey="oneWayTrip" title="One Way Trip">
            Tab content for One Way Trip
          </Tab>   
          <Tab eventKey="returnTrip" title="Return Trip" disabled={returnTrip ? false : true}>
            Tab content for Return Trip
          </Tab>       
        </Tabs>
      </Col>
    </Row>
  );
}

export default CheckAvailability;