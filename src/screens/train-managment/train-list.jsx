import React, { useState } from "react";
import { Card, Button, Row, Col, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useTrain } from "../../hooks/api/useTrain";
import { toast } from "react-toastify";

const TrainList = () => {
  const { getAllTrains, cancelTrain } = useTrain();
  const navigate = useNavigate();
  const [trains, setTrains] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Function to retrieve the list of trains
  const getTrainList = async () => {
    const trainList = await getAllTrains();

    if (trainList) {
      setTrains(trainList);
    }
  };

  // UseEffect to fetch the train list when the component mounts
  React.useEffect(() => {
    getTrainList();
  }, []);

  // Function to open the details modal
  const openModal = (train) => {
    setSelectedTrain(train);
    setShowModal(true);
  };

  // Function to close the details modal
  const closeModal = () => {
    setSelectedTrain(null);
    setShowModal(false);
  };

  // Function to open the delete confirmation modal
  const openDeleteModal = (train) => {
    setSelectedTrain(train);
    setShowDeleteModal(true);
  };

  // Function to close the delete confirmation modal
  const closeDeleteModal = () => {
    setSelectedTrain(null);
    setShowDeleteModal(false);
  };

  // Function to handle train cancellation
  const handleDelete = async () => {
    if (selectedTrain) {
      const isCanceled = await cancelTrain(selectedTrain.id);
      if (isCanceled) {
        toast.success("Train cancellation Successful");
        getTrainList();
      } else {
        toast.error("Train cancellation unsuccessful");
      }
    }

    setShowDeleteModal(false);
  };
  return (
    <Container>
      <Row className="justify-content-center" style={{ marginTop: "100px" }}>
        <Row className="justify-content-center mb-3">
          <Col className="col-auto">
            <h2>Trains</h2>
          </Col>
        </Row>
        <Row className="justify-content-center mb-3">
          <Col sm={12} md={6} lg={8}>
            <Button variant="info" onClick={() => navigate("/create-train")}>
              Create Train
            </Button>
          </Col>
        </Row>
        {trains.map((train, index) => (
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
                        <Col>
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
                            onClick={() => navigate("/edit-train")}
                            className="me-2"
                          >
                            Edit
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="mt-2">
                          <Button
                            variant="danger"
                            onClick={() => openDeleteModal(train)}
                          >
                            Cancel
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
              <strong>Available Dates:</strong>{" "}
              {selectedTrain.availableDates.join(", ")}
              <br />
              <strong>First Class Tickets:</strong>{" "}
              {selectedTrain.firstClassTickets}
              <br />
              <strong>Second Class Tickets:</strong>{" "}
              {selectedTrain.secondClassTickets}
              <br />
              <strong>Third Class Tickets:</strong>{" "}
              {selectedTrain.thirdClassTickets}
              <br />
              <strong>Schedules:</strong>
              <ul>
                {selectedTrain.schedules.map((schedule, index) => (
                  <li key={index}>
                    <strong>Station:</strong> {schedule.station}
                    <br />
                    <strong>Arrival Time:</strong> {schedule.arrivalTime}
                    <br />
                    <strong>Departure Time:</strong> {schedule.departureTime}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Train Cancelation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTrain && (
            <div>
              <p>
                Are you sure you want to cancel the train "{selectedTrain.name}
                "?
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Back
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Cancel Train
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TrainList;
