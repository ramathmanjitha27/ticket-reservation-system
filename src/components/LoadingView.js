import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingView = () => {
  return (
    <div className="mt-5 d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingView;
