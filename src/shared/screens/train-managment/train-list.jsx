import React, { useState } from "react";
import { Card, Button, Row, Col, Container, Modal } from "react-bootstrap";

const sampleTrains = [
  {
    name: "Express Train 1",
    departureStation: "Station A",
    arrivalStation: "Station B",
    isActive: true,
    isPublished: true,
  },
  {
    name: "Local Train 2",
    departureStation: "Station X",
    arrivalStation: "Station Y",
    isActive: true,
    isPublished: false,
  },
  {
    name: "High-Speed Train 3",
    departureStation: "Station M",
    arrivalStation: "Station N",
    isActive: false,
    isPublished: true,
  },
  {
    name: "Shuttle Train 4",
    departureStation: "Station P",
    arrivalStation: "Station Q",
    isActive: true,
    isPublished: true,
  },
];

const TrainList = ({ trains }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);

  const openModal = (train) => {
    setSelectedTrain(train);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTrain(null);
    setShowModal(false);
  };
  return (
    <Container>
      <Row className="justify-content-center">
        {sampleTrains.map((train, index) => (
          <Col key={index} sm={12} md={6} lg={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{train.name}</Card.Title>
                <Card.Text>
                  <Row>
                    <Col>
                      <strong>Departure:</strong> {train.departureStation}
                      <br />
                      <strong>Arrival:</strong> {train.arrivalStation}
                      <br />
                      <strong>Active:</strong> {train.isActive ? "Yes" : "No"}
                      <br />
                      <strong>Published:</strong>{" "}
                      {train.isPublished ? "Yes" : "No"}
                      <br />
                    </Col>
                    <Col className="col-2">
                      <Row>
                        <Col className="ms-2">
                          <Button
                            variant="success"
                            onClick={() => openModal(train)}
                          >
                            View Details
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="mt-2">
                          <Button
                            variant="primary"
                            //   onClick={() => onEdit(train)}
                            className="me-2"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            // onClick={() => onDelete(train)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Train Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTrain && (
            <div>
              <strong>Name:</strong> {selectedTrain.name}
              <br />
              <strong>Departure:</strong> {selectedTrain.departureStation}
              <br />
              <strong>Arrival:</strong> {selectedTrain.arrivalStation}
              <br />
              <strong>Active:</strong> {selectedTrain.isActive ? "Yes" : "No"}
              <br />
              <strong>Published:</strong>{" "}
              {selectedTrain.isPublished ? "Yes" : "No"}
              <br />
              {/* Add other train details here */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TrainList;
