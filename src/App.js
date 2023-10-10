import React from "react";
import "./App.css";
import CreateTrain from "./shared/screens/train-managment/create-train";
import { Row, Col } from "react-bootstrap";

function App() {
  return (
    <>
      <Row>
        <Col>
          <CreateTrain />
        </Col>
      </Row>
    </>
  );
}

export default App;
