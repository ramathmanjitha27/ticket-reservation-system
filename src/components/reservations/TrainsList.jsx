import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function TrainsList({ departure, arrival, ticketClass, count, trains }) {
  return (
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
            {train.schedules.filter((schedule) => schedule.station === departure).map((station) => (
              <td>{station.departureTime}</td>
            ))}
            {train.schedules.filter((schedule) => schedule.station === arrival).map((station) => (
              <td>{station.arrivalTime}</td>
            ))}
            <td>{ticketClass}</td>
            <td>{count}</td>
            <td><Button>Reserve</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TrainsList;