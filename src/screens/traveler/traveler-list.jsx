import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useTraveler } from "../../hooks/api/useTraveler";
import { toast } from "react-toastify";

export default function Travelerlist() {
  const [travelers, setTravelers] = useState([]);
  // const [count, setCount] = useState(1);

  const { getAllTravelers, changeStatusTraveler } = useTraveler();

  const getAllTravelersData = async () => {
    const travelersData = await getAllTravelers();

    console.log("travelers", travelers);

    if (travelers) {
      setTravelers(travelersData);
    }
  };

  // UseEffect to fetch the train list when the component mounts
  React.useEffect(() => {
    getAllTravelersData();
  }, []);

  const toggleStatus = async (id) => {
    if (id) {
      const isDeactivate = await changeStatusTraveler(id);
      console.log("isDeactivate", isDeactivate);
      if (isDeactivate) {
        toast.success("Traveler cancellation Successful");
        await getAllTravelersData();
      } else {
        toast.error("Traveler cancellation unsuccessful");
        await getAllTravelersData();
      }
    }
    // const updatedTravelers = travelers.map((traveler) => {
    //   if (traveler.id === id) {
    //     // Toggle the status
    //     traveler.IsActive = !traveler.IsActive;
    //   }
    //   return traveler;
    // });
    // setTravelers(updatedTravelers);
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

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {travelers.map((traveler) => (
              <tr key={traveler.id}>
                {/* <td>{count++}</td> */}
                <td>{traveler.title}</td>
                <td>{traveler.firstName}</td>
                <td>{traveler.lastName}</td>
                <td>{traveler.phoneNumber}</td>
                <td>{traveler.address}</td>
                <td>{traveler.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <Button
                    onClick={() => toggleStatus(traveler.id)}
                    variant={traveler.isActive ? "danger" : "success"}
                  >
                    {traveler.isActive ? "Deactivate" : "Activate"}
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
