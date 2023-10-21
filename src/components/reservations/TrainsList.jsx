import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import ConfirmModal from "./ConfirmModal";
import { useReservation } from "../../hooks/api/useReservation";

function TrainsList({
  departure,
  arrival,
  date,
  reservation,
  trains,
  modalHeading,
}) {
  const [show, setShow] = useState(false);
  const [trainId, setTrainId] = useState("");

  const reservationInfo = {
    departure: departure,
    arrival: arrival,
    date: date,
    time: "",
    ticketCount: reservation.ticketCount,
    ticketClass: reservation.ticketClass,
    trainId: "",
    travelerId: reservation.travelerId,
  };

  const { addReservation, updateReservation, updateTicketCount } =
    useReservation();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = async () => {
    if (modalHeading === "Confirm Reservation") {
      // Post reservation here
      reservationInfo.trainId = trainId;

      const newDate = new Date(Date.parse(reservationInfo.date));
      const isoString = newDate.toISOString();
      reservationInfo.date = isoString;

      const responseData = await addReservation(reservationInfo);

      // Update train ticket count here
      const ticketResponse = await updateTicketCount(
        trainId,
        reservationInfo.ticketClass,
        reservationInfo.ticketCount,
        true
      );
      console.log(ticketResponse);

      alert(responseData);
      navigate("/staff");
    } else {
      // Update reservation here
      reservationInfo.trainId = trainId;
      const newDate = new Date(Date.parse(reservationInfo.date));
      const isoString = newDate.toISOString();
      reservationInfo.date = isoString;

      reservationInfo.id = reservation.id;

      const responseData = await updateReservation(
        reservationInfo.id,
        reservationInfo
      );

      // Update train ticket count here
      const ticketResponse = await updateTicketCount(
        trainId,
        reservationInfo.ticketClass,
        reservationInfo.ticketCount,
        true
      );
      console.log(ticketResponse);

      alert(responseData);
      navigate("/staff/reservations/details");
    }
    setShow(false);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Ticket Class</th>
            <th>Ticket Count</th>
            <th>Confirmation</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.id}>
              <td>{train.name}</td>
              {train.schedules
                .filter((schedule) => schedule.station === departure)
                .map((station) => {
                  reservationInfo.time = station.departureTime;
                  return <td>{station.departureTime}</td>;
                })}
              {train.schedules
                .filter((schedule) => schedule.station === arrival)
                .map((station) => (
                  <td>{station.arrivalTime}</td>
                ))}
              <td>{reservation.ticketClass}</td>
              <td>{reservation.ticketCount}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    reservationInfo.trainId = train.id;
                    setTrainId(train.id);
                    handleShow();
                  }}
                >
                  Confirm
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmModal
        modalHeading={modalHeading}
        show={show}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        reservationInfo={reservationInfo}
        redBtn={false}
      />
    </>
  );
}

export default TrainsList;
