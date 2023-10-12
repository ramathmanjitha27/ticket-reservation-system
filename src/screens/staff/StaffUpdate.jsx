import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useStaff } from "../../hooks/api/useStaff";

const StaffUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateStaffMember } = useStaff();

  const [fullName, setFullName] = useState(location.state?.fullName || "");
  const [username, setUsername] = useState(location.state?.username || "");
  const [roles, setRoles] = useState(location.state?.roles || []);
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState(location.state?.password || "");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActivated, setIsActivated] = useState(
    location.state?.isActivated || false
  );
  const [travelerIds, setTravelerIds] = useState(
    location.state?.travelerIds || []
  );
  const [staffId, setStaffId] = useState("652729a0aa4a0ec253b4c68e");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (roles.length === 0) {
      alert("Please select at least one role");
      return;
    }

    if (email.length < 5) {
      alert("Please enter a valid email address");
      return;
    }

    if (username.length === 0) {
      alert("Please insert a username");
      return;
    }

    if (fullName.length < 5) {
      alert("Full name must be at least 5 characters");
      return;
    }

    // make the backend call here...
    const inputObj = {
      Id: staffId,
      Username: username,
      FullName: fullName,
      Email: email,
      Password: password,
      Roles: roles,
      IsActivated: true,
      TravelerIds: travelerIds,
    };

    const responseData = await updateStaffMember(staffId, inputObj);

    if (responseData) {
      alert("Your profile details updated!");
      navigate("/staff/profile");
    } else {
      alert("Data update is not successful!, Please try again");
    }
  };

  const handleMultiSelect = (item) => {
    const isRoleSelected = roles.includes(item);

    let newRoles;
    if (isRoleSelected) {
      newRoles = roles.filter((role) => role !== item);
    } else {
      newRoles = [...roles, item];
    }

    // Update the roles state
    setRoles(newRoles);
  };

  const onCancel = () => {
    window.history.back();
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{
        marginTop: "50px",
      }}
    >
      <Card style={{ width: "85vh", minHeight: "85vh" }} className="my-5">
        <Row
          className="justify-content-center"
          style={{
            marginTop: "50px",
          }}
        >
          <Col className="mx-5">
            <Row className="justify-content-center">
              <Col className="col-auto mb-5">
                <h2>Update Your Details</h2>
              </Col>
            </Row>
            <Form onSubmit={handleSubmit}>
              <Col>
                <FormGroup controlId="fullName" className="mb-3">
                  <FormLabel>Enter your full name</FormLabel>
                  <FormControl
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup controlId="username" className="mb-3">
                  <FormLabel>Enter a Username</FormLabel>
                  <FormControl
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>

                <FormGroup controlId="email" className="mb-3">
                  <FormLabel>Enter Email Address</FormLabel>
                  <FormControl
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup controlId="password" className="mb-3">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup controlId="confirm_password" className="mb-3">
                  <FormLabel>Re-enter Password</FormLabel>
                  <FormControl
                    type="password"
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup controlId="password" className="mb-3">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="option1"
                      onChange={() => handleMultiSelect("admin")}
                      checked={roles.includes("admin")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      Admin
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value="option2"
                      onChange={() => handleMultiSelect("agent")}
                      checked={roles.includes("agent")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox2"
                    >
                      Travel Agent
                    </label>
                  </div>
                </FormGroup>
              </Col>

              {/* <Row className="justify-content-center">
            <Col className="col-auto my-5">
              <Button type="submit">Submit</Button>
            </Col>
          </Row> */}

              <div className="d-flex justify-content-between my-5">
                <Button variant="btn btn-outline-primary" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default StaffUpdate;
