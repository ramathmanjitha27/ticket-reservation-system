import React, { useEffect, useState } from "react";
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
import { useStaff } from "../../hooks/api/useStaff";
import { useNavigate } from "react-router-dom";

const StaffRegister = () => {
  const { registerStaffMember } = useStaff();
  const navigete = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      Username: username,
      FullName: fullName,
      Email: email,
      Password: password,
      Roles: roles,
      IsActivated: true,
    };

    const responseData = await registerStaffMember(inputObj);

    if (responseData) {
      alert("You are successfully registered!");
      navigete("/");
    } else {
      alert("Staff member is not created successfully!, Please try again");
    }
  };

  useEffect(() => {
    handleMultiSelect("agent");
  }, []);

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
                <h2>Staff Registration</h2>
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
                <FormGroup controlId="password" className="mb-3">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="option1"
                      onChange={() => handleMultiSelect("admin")}
                    />
                    <label class="form-check-label" for="inlineCheckbox1">
                      Admin
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value="option2"
                      onChange={() => handleMultiSelect("agent")}
                      defaultChecked
                    />
                    <label class="form-check-label" for="inlineCheckbox2">
                      Travel Agent
                    </label>
                  </div>
                </FormGroup>
              </Col>

              <Row className="justify-content-center">
                <Col className="col-auto my-5">
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default StaffRegister;
