import Table from 'react-bootstrap/Table';

function TrainsList() {
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
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default TrainsList;