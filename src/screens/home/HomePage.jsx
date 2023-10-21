import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import "./HomePage.css"; // Create a CSS file for styling

const HomePage = () => {
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
          <Row className="justify-content-center align-items-center vh-100">
            <Col className="col-auto">
              <h1 style={{ color: "white", fontSize: "56px" }}>
                Welcome to Train Management Web App
              </h1>
              <p style={{ color: "black", fontSize: "36px" }}>
                <center>
                  Manage trains, reservations, and users efficiently.
                </center>
              </p>
            </Col>
          </Row>

          {/* <Row
            className="justify-content-center align-items-center"
            style={{ marginTop: "105px" }}
          >
            <Col className="col-2">
              <div className="train-button">
                <Button variant="primary" size="lg">
                  Trains
                </Button>
                <img
                  src="train-image-1.jpg"
                  alt="Train 1"
                  className="train-image"
                />
              </div>
            </Col>
            <Col className="col-2">
              <div className="train-button">
                <Button variant="success" size="lg">
                  Reservations
                </Button>
                <img
                  src="train-image-2.jpg"
                  alt="Train 2"
                  className="train-image"
                />
              </div>
            </Col>
            <Col className="col-2">
              <div className="train-button">
                <Button variant="info" size="lg">
                  Users
                </Button>
                <img
                  src="train-image-3.jpg"
                  alt="Train 3"
                  className="train-image"
                />
              </div>
            </Col>
          </Row> */}
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
