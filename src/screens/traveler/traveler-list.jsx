import React, {useEffect,useState} from 'react';
import Table from 'react-bootstrap/Table';
import { Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

export default function Travelerlist() {
    const[travelers, setTravelers] = useState([]);
    // const [count, setCount] = useState(1);

    const travelerData = [
        {
            "id": 1,
          "NIC": "199911223344",
          "FirstName": "KavishKa",
          "LastName": "Shehani",
          "Title": "Miss",
          "Email": "Kavi@gmail.com",
          "PhoneNumber": "0778767654",
          "Address": "Nuwara Eliya",
          "Password": "123454",
          "IsActive": true
        },
        {
            "id": 2,
            "NIC": "198812345678",
            "FirstName": "John",
            "LastName": "Doe",
            "Title": "Mr",
            "Email": "john.doe@example.com",
            "PhoneNumber": "1234567890",
            "Address": "123 Main Street",
            "Password": "password123",
            "IsActive": true
        },
        {
            "id": 3,
            "NIC": "200001234567",
            "FirstName": "Alice",
            "LastName": "Smith",
            "Title": "Ms",
            "Email": "alice.smith@example.com",
            "PhoneNumber": "9876543210",
            "Address": "456 Elm Avenue",
            "Password": "securepwd456",
            "IsActive": false
        },
        {
            "id": 4,
            "NIC": "199810101010",
            "FirstName": "Michael",
            "LastName": "Johnson",
            "Title": "Dr",
            "Email": "michael.j@example.com",
            "PhoneNumber": "5551234567",
            "Address": "789 Oak Road",
            "Password": "mypassword",
            "IsActive": true
        },       
        {
            "id": 5,
            "NIC": "198712121212",
            "FirstName": "Sarah",
            "LastName": "Brown",
            "Title": "Mrs",
            "Email": "sarah.b@example.com",
            "PhoneNumber": "3339998888",
            "Address": "321 Cedar Lane",
            "Password": "secret123",
            "IsActive": true
        },  
        {
            "id": 6,
            "NIC": "200506070809",
            "FirstName": "David",
            "LastName": "Wilson",
            "Title": "Mr",
            "Email": "david.w@example.com",
            "PhoneNumber": "6667778888",
            "Address": "567 Pine Street",
            "Password": "davidpwd567",
            "IsActive": true
        }                    
    ]

    useEffect(() => {
        setTravelers(travelerData);
		// function getTravelers() {
		// 	axios
		// 		.get('http://localhost:8070/drug/')
		// 		.then((res) => {
		// 			setTravelers(res.data);
		// 		})
		// 		.catch((err) => {
		// 			alert(err.message);
		// 		});
		// }
		// getTravelers();
	}, []);

    const toggleStatus = (id) => {
        const updatedTravelers = travelers.map((traveler) => {
          if (traveler.id === id) {
            // Toggle the status
            traveler.IsActive = !traveler.IsActive;
          }
          return traveler;
        });
    
        setTravelers(updatedTravelers);
      };
    
    return (
        <>
        <Row className="justify-content-center" style={{ marginTop: "100px" }}>
        <Row className="justify-content-center mb-3">
          <Col className="col-auto">
            <h2>Travelers</h2>
          </Col>
        </Row>
          <Table striped bordered hover>
            <thead>
              <tr>      
                {/* <th>Number</th> */}
                <th>Title</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>                
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {travelers.map((traveler) => (
                <tr key={traveler.id}>
                    {/* <td>{count++}</td> */}
                    <td>{traveler.Title}</td>
                    <td>{traveler.Title}</td>
                    <td>{traveler.FirstName}</td>
                    <td>{traveler.LastName}</td>
                    <td>{traveler.PhoneNumber}</td>
                    <td>{traveler.Address}</td>
                    <td>{traveler.IsActive ? "Active" : "Inactive"}</td>
                    <td>
                  <Button
                    onClick={() => toggleStatus(traveler.id)}
                    variant={traveler.IsActive ? "danger" : "success"}
                  >
                    {traveler.IsActive ? "Deactivate" : "Activate"}
                  </Button>
                </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </Row>
        </>  
      );
}
