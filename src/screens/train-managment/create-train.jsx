import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Row,
  Col,
  Container,
  Card,
} from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import Select from "react-select";
import { toast } from "react-toastify";
import { useTrain } from "../../hooks/api/useTrain";
import { options } from "../../constants/trainConstant";
import { useNavigate } from "react-router";

const CreateTrain = () => {
  // Initialize state and hooks
  const { createTrainAPI } = useTrain();
  const navigate = useNavigate();
  const [train, setTrain] = useState({
    name: "",
    departureStation: "",
    arrivalStation: "",
    isActive: false,
    isPublished: false,
    availableDates: [],
    firstClassTickets: 0,
    secondClassTickets: 0,
    thirdClassTickets: 0,
    schedules: [{ station: "", arrivalTime: "", departureTime: "" }],
  });

  const [isPublished, setIsPublished] = useState(false);
  const [isActived, setIsActived] = useState(false);
  const [availableDates, setAvailableDates] = useState([
    options[0].value,
    options[1].value,
  ]);
  const [firstClassTickets, setFirstClassTickets] = useState(0);
  const [secondClassTickets, setSecondClassTickets] = useState(0);
  const [thirdClassTickets, setThirdClassTickets] = useState(0);

  const [nameError, setNameError] = useState("");
  const [departureStationError, setDepartureStationError] = useState("");
  const [arrivalStationError, setArrivalStationError] = useState("");

  // Function to clear the form
  const clearForm = () => {
    setTrain({
      name: "",
      departureStation: "",
      arrivalStation: "",
      isActive: false,
      isPublished: false,
      availableDates: [],
      firstClassTickets: 0,
      secondClassTickets: 0,
      thirdClassTickets: 0,
      schedules: [{ station: "", arrivalTime: "", departureTime: "" }],
    });
    setFirstClassTickets(0);
    setSecondClassTickets(0);
    setThirdClassTickets(0);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (train.name.trim() === "") {
      setNameError("Train Name is required");
      return;
    } else {
      setNameError("");
    }

    if (train.departureStation.trim() === "") {
      setDepartureStationError("Departure Station is required");
      return;
    } else {
      setDepartureStationError("");
    }

    if (train.arrivalStation.trim() === "") {
      setArrivalStationError("Arrival Station is required");
      return;
    } else {
      setArrivalStationError("");
    }

    const newTrain = {
      ...train,
      firstClassTickets: Number(firstClassTickets),
      secondClassTickets: Number(secondClassTickets),
      thirdClassTickets: Number(thirdClassTickets),
      isActive: isActived,
      isPublished: isPublished,
    };

    const responseData = await createTrainAPI(newTrain);

    if (responseData) {
      toast.success("Train creation Successful");
      navigate("/trains");
      clearForm();
    } else {
      toast.error("Train creation unsuccessful");
    }
  };

  // Function to handle form input changes
  const handleChange = (event) => {
    setTrain({
      ...train,
      [event.target.name]: event.target.value,
    });

    // Check if the field is empty and update the error message accordingly
    if (event.target.name === "name") {
      setNameError(
        event.target.value.trim() === "" ? "Train Name is required" : ""
      );
    } else if (event.target.name === "departureStation") {
      setDepartureStationError(
        event.target.value.trim() === "" ? "Departure Station is required" : ""
      );
    } else if (event.target.name === "arrivalStation") {
      setArrivalStationError(
        event.target.value.trim() === "" ? "Arrival Station is required" : ""
      );
    }
  };

  // Function to handle changes in schedule input
  const handleScheduleChange = (event, index, subfield) => {
    const updatedSchedules = [...train.schedules];
    updatedSchedules[index][subfield] = event.target.value;
    setTrain({ ...train, schedules: updatedSchedules });
  };

  // Function to add a new schedule
  const addSchedule = () => {
    setTrain({
      ...train,
      schedules: [
        ...train.schedules,
        { station: "", arrivalTime: "", departureTime: "" },
      ],
    });
  };

  // Function to delete a schedule
  const deleteSchedule = (index) => {
    const updatedSchedules = [...train.schedules];
    updatedSchedules.splice(index, 1);
    setTrain({ ...train, schedules: updatedSchedules });
  };

  // Function to handle changes in available dates
  const handleAvailableDatesChange = (event) => {
    const selectedDates = Array.from(event).map((data) => data.value);
    setTrain({ ...train, availableDates: selectedDates });
    setAvailableDates(selectedDates);
  };

  return (
    <div
      style={{
        backgroundImage:
          " url(https://www.absolutelankatours.com/wp-content/uploads/2019/03/Train-Tours-Sri-Lanka.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Container>
          <Row className="justify-content-center my-5">
            <Col className="col-10 col-md-7">
              <Card className="px-5 my-5">
                <Row className="justify-content-center">
                  <Col className="col-auto my-5">
                    <h2>Create Train</h2>
                  </Col>
                </Row>
                <Form onSubmit={handleSubmit}>
                  <FormGroup controlId="trainName">
                    <FormLabel>Train Name</FormLabel>
                    <FormControl
                      type="text"
                      name="name"
                      value={train.name}
                      onChange={handleChange}
                    />
                    {nameError && (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {nameError}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup controlId="departureStation" className="mt-2">
                    <FormLabel>Departure Station</FormLabel>
                    <FormControl
                      type="text"
                      name="departureStation"
                      value={train.departureStation}
                      onChange={handleChange}
                    />
                    {departureStationError && (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {departureStationError}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup controlId="arrivalStation" className="mt-2">
                    <FormLabel>Arrival Station</FormLabel>
                    <FormControl
                      type="text"
                      name="arrivalStation"
                      value={train.arrivalStation}
                      onChange={handleChange}
                    />
                    {arrivalStationError && (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {arrivalStationError}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup controlId="availableDates" className="mt-2">
                    <FormLabel>Available Dates</FormLabel>
                    <Select
                      defaultValue={[options[0], options[1]]}
                      isMulti
                      name="options"
                      options={options}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={handleAvailableDatesChange}
                    />
                  </FormGroup>

                  <FormGroup controlId="ticketsAvailability" className="my-3">
                    <FormLabel>Tickets Availability</FormLabel>
                    <Row>
                      <Col>
                        <FormLabel>
                          <b>First Class</b>
                        </FormLabel>
                        <Row>
                          <Col>
                            <FormLabel>Tickets</FormLabel>
                            <FormControl
                              type="number"
                              name="firstClassTickets"
                              value={firstClassTickets}
                              onChange={(e) =>
                                setFirstClassTickets(e.target.value)
                              }
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <FormLabel>
                          <b>Second Class</b>
                        </FormLabel>
                        <Row>
                          <Col>
                            <FormLabel>Tickets</FormLabel>
                            <FormControl
                              type="number"
                              name="secondClassTickets"
                              value={secondClassTickets}
                              onChange={(e) =>
                                setSecondClassTickets(e.target.value)
                              }
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <FormLabel>
                          <b>Third Class</b>
                        </FormLabel>
                        <Row>
                          <Col>
                            <FormLabel>Tickets</FormLabel>
                            <FormControl
                              type="number"
                              name="thirdClassTickets"
                              value={thirdClassTickets}
                              onChange={(e) =>
                                setThirdClassTickets(e.target.value)
                              }
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup controlId="schedules" className="mt-2">
                    <FormLabel>Schedules</FormLabel>
                    {train.schedules.map((schedule, index) => (
                      <Row key={index} className="align-items-center">
                        <Col>
                          <FormGroup controlId={`station-${index}`}>
                            <FormLabel>Station</FormLabel>
                            <FormControl
                              type="text"
                              name="station"
                              value={schedule.station}
                              onChange={(e) =>
                                handleScheduleChange(e, index, "station")
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup controlId={`arrivalTime-${index}`}>
                            <FormLabel>Arrival Time</FormLabel>
                            <FormControl
                              type="time"
                              name="arrivalTime"
                              value={schedule.arrivalTime}
                              onChange={(e) =>
                                handleScheduleChange(e, index, "arrivalTime")
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup controlId={`departureTime-${index}`}>
                            <FormLabel>Departure Time</FormLabel>
                            <FormControl
                              type="time"
                              name="departureTime"
                              value={schedule.departureTime}
                              onChange={(e) =>
                                handleScheduleChange(e, index, "departureTime")
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-auto" style={{ cursor: "pointer" }}>
                          <FaTrashAlt
                            color="red"
                            onClick={() => deleteSchedule(index)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Row>
                      <Col className="my-3">
                        <Button variant="secondary" onClick={addSchedule}>
                          Add Schedule
                        </Button>
                      </Col>
                    </Row>
                  </FormGroup>
                  <Row className="my-3">
                    <Col>
                      <FormGroup controlId="isPublished">
                        <FormLabel>Publish </FormLabel>
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          value={isPublished}
                          onChange={() => setIsPublished(!isPublished)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <FormGroup controlId="isActived">
                        <FormLabel>Activation</FormLabel>
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          value={isActived}
                          onChange={() => setIsActived(!isActived)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col className="col-auto my-5">
                      <Button type="submit">Create Train</Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default CreateTrain;
