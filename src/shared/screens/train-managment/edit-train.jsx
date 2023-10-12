import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";

const EditTrain = () => {
  const [train, setTrain] = useState({
    name: "",
    departureStation: "",
    arrivalStation: "",
    isActive: true,
    isPublished: false,
    availableDates: [],
    ticketsAvailability: [],
    schedules: [{ station: "", arrivalTime: "", departureTime: "" }],
  });

  const [radioValue, setRadioValue] = useState("1");
  const [radioPublishValue, setRadioPublishValue] = useState("1");

  const radios = [
    { name: "Active", value: "Active" },
    { name: "InActive", value: "Inactive" },
  ];

  const radiosPublish = [
    { name: "Publish", value: "Publish" },
    { name: "Unpublish", value: "Unpublish" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new train object with the form data.
    const newTrain = {
      ...train,
      availableDates: train.availableDates.split(","),
    };

    // Send the new train object to the server to be created.
    // ...

    // Clear the form.
    setTrain({
      name: "",
      departureStation: "",
      arrivalStation: "",
      isActive: true,
      isPublished: false,
      availableDates: [],
      ticketsAvailability: [],
      schedules: [{ station: "", arrivalTime: "", departureTime: "" }],
    });
  };

  const handleChange = (event) => {
    setTrain({
      ...train,
      [event.target.name]: event.target.value,
    });
  };

  const handleScheduleChange = (event, index, subfield) => {
    const updatedSchedules = [...train.schedules];
    updatedSchedules[index][subfield] = event.target.value;
    setTrain({ ...train, schedules: updatedSchedules });
  };

  const addSchedule = () => {
    setTrain({
      ...train,
      schedules: [
        ...train.schedules,
        { station: "", arrivalTime: "", departureTime: "" },
      ],
    });
  };

  const deleteSchedule = (index) => {
    const updatedSchedules = [...train.schedules];
    updatedSchedules.splice(index, 1);
    setTrain({ ...train, schedules: updatedSchedules });
  };

  const handleAvailableDatesChange = (event) => {
    const selectedDates = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setTrain({ ...train, availableDates: selectedDates });
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <Row className="justify-content-center">
      <Col className="col-5">
        <Row className="justify-content-center">
          <Col className="col-auto my-5">
            <h2>Edit Train</h2>
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
          </FormGroup>
          <FormGroup controlId="departureStation">
            <FormLabel>Departure Station</FormLabel>
            <FormControl
              type="text"
              name="departureStation"
              value={train.departureStation}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup controlId="arrivalStation">
            <FormLabel>Arrival Station</FormLabel>
            <FormControl
              type="text"
              name="arrivalStation"
              value={train.arrivalStation}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup controlId="availableDates">
            <FormLabel>Available Dates</FormLabel>
            <FormControl
              as="select"
              name="availableDates"
              multiple
              value={train.availableDates}
              onChange={handleAvailableDatesChange}
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </FormControl>
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
                      type="text"
                      name="ticketsAvailability"
                      value={train.ticketsAvailability
                        .map((ticket) => `${ticket.class}: ${ticket.tickets}`)
                        .join(", ")}
                      onChange={handleChange}
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
                      type="text"
                      name="ticketsAvailability"
                      value={train.ticketsAvailability
                        .map((ticket) => `${ticket.class}: ${ticket.tickets}`)
                        .join(", ")}
                      onChange={handleChange}
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
                      type="text"
                      name="ticketsAvailability"
                      value={train.ticketsAvailability
                        .map((ticket) => `${ticket.class}: ${ticket.tickets}`)
                        .join(", ")}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup controlId="schedules">
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
                <FormLabel>Publish</FormLabel>
                <ButtonGroup className="ms-3">
                  {radiosPublish.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-publish-${idx}`}
                      type="radio"
                      variant={idx % 2 ? "outline-danger" : "outline-success"}
                      name="radio-publish"
                      value={radio.value}
                      checked={radioPublishValue === radio.value}
                      onChange={(e) =>
                        setRadioPublishValue(e.currentTarget.value)
                      }
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </FormGroup>
            </Col>
            <Col className="d-flex justify-content-end">
              <FormGroup controlId="isActived">
                <FormLabel>Activation</FormLabel>
                <ButtonGroup className="ms-3">
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={idx % 2 ? "outline-danger" : "outline-success"}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </FormGroup>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col className="col-auto my-5">
              <Button type="submit">Edit Train</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default EditTrain;
