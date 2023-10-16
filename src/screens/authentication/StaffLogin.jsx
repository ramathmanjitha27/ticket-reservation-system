import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../../hooks/api/useAuth";

const StaffLogin = () => {
  const { staffLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  // Function to handle the login form submission
  const loginHandler = async (e) => {
    e.preventDefault();

    // Check if the email is provided
    if (email.length === 0) {
      alert("Please insert a email");
      return;
    }

    // Check if the password is provided
    if (password.length === 0) {
      alert("Please insert a password");
      return;
    }

    // Prepare an object with email and password for login
    const logInObt = {
      Email: email,
      Password: password,
    };

    // Call a 'LoginStaff' function for authentication
    const loginResponse = await staffLogin(logInObt);

    if (loginResponse.status === 200) {
      // Store user data in local storage upon successful login
      localStorage.setItem("user", JSON.stringify(loginResponse));
      localStorage.setItem("token", loginResponse.data);
      window.location.href = "/staff";
    } else {
      alert("Email or Password is incorrect!");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return (
    <div
      className="d-flex align-items-center"
      style={{
        // marginTop: "50px",
        height: "100vh",
        backgroundImage:
          " url(https://www.tokkoro.com/picsup/2874687-nature-landscape-train-machine-smoke-trees-clouds-bridge-railway-mountain-steam-locomotive___landscape-nature-wallpapers.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundColor: "black",
          opacity: "40%",
        }}
      />
      <Card
        style={{ width: "60vh", minHeight: "45vh", left: "30vh" }}
        className="my-5 d-flex justify-content-center "
      >
        <Form className="mx-5" onSubmit={loginHandler}>
          <Form.Group>
            <h2 className="text-center mb-3">Staff Login</h2>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>
          <div className="pt-3 d-flex justify-content-center ">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default StaffLogin;
