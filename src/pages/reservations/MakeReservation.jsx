import { Row, Col } from 'react-bootstrap';
import ReservationForm from '../../components/reservations/ReservationForm';

function MakeReservation() {
  return (
      // <div style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      // }}>
      //   <h1 style={{
      //     marginTop: "40px",
      //     marginBottom: "40px"}}>
      //       Reserve Train Tickets
      //   </h1>
      //   <ReservationForm />
      // </div>

      <Row className="justify-content-center">
        <Col className="col-auto">
          <h1 style={{
            marginTop: "40px",
            marginBottom: "40px"}}>
              Reserve Train Tickets
          </h1>
          <ReservationForm />
        </Col>
      </Row>
  )
}

export default MakeReservation;

