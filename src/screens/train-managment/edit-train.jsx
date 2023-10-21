import React, { useState, useEffect } from "react";
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
import { useNavigate, useLocation } from "react-router";

const options = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

const EditTrain = () => {
  const { updateTrain } = useTrain();

  const navigate = useNavigate();
  const location = useLocation();

  const [train, setTrain] = useState(
    location.state?.train || {
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
    }
  );
  const [isPublished, setIsPublished] = useState(train.isPublished);
  const [isActived, setIsActived] = useState(false);
  const [availableDates, setAvailableDates] = useState([
    options[0].value,
    options[1].value,
  ]);
  const [firstClassTickets, setFirstClassTickets] = useState(0);
  const [secondClassTickets, setSecondClassTickets] = useState(0);
  const [thirdClassTickets, setThirdClassTickets] = useState(0);

  useEffect(() => {
    setIsPublished(train.isPublished);
    setIsActived(train.isActive);
    setAvailableDates(train.availableDates);
    setFirstClassTickets(train.firstClassTickets);
    setSecondClassTickets(train.secondClassTickets);
    setThirdClassTickets(train.thirdClassTickets);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedTrain = {
      ...train,
      firstClassTickets: Number(firstClassTickets),
      secondClassTickets: Number(secondClassTickets),
      thirdClassTickets: Number(thirdClassTickets),
      isActive: isActived,
      isPublished: isPublished,
    };

    const responseData = await updateTrain(train.id, updatedTrain);

    if (responseData) {
      toast.success("Train update successful");
      navigate("/staff/trains");
    } else {
      toast.error("Train update unsuccessful");
    }
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
                    <h2>Update Train</h2>
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
                    <Select
                      defaultValue={[options[0], options[1]]}
                      isMulti
                      name="options"
                      options={options}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={availableDates}
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
                        <FormLabel>Publish </FormLabel>
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          defaultChecked={isPublished}
                          value={isPublished}
                          onChange={() => setIsPublished(!isPublished)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col className="col-auto my-5">
                      <Button type="submit">Update Train</Button>
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

export default EditTrain;
