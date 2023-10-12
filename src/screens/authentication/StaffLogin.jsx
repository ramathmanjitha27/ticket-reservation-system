import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

// https://images.pexels.com/photos/2867110/pexels-photo-2867110.jpeg?auto=compress&cs=tinysrgb&w=1600
// https://www.railway-technology.com/wp-content/uploads/sites/13/2023/05/shutterstock_1672556236.jpg
// https://images.pexels.com/photos/166129/pexels-photo-166129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
// https://th.bing.com/th/id/R.a4b0fd20e276a7f5a8e12991b3c4e0e2?rik=rTuC9mLJlDC2OA&pid=ImgRaw&r=0
// https://www.tokkoro.com/picsup/2874687-nature-landscape-train-machine-smoke-trees-clouds-bridge-railway-mountain-steam-locomotive___landscape-nature-wallpapers.jpg

const StaffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();

    console.log('submitted');

    if (email.length === 0) {
      alert("Please insert a email");
      return;
    }

    if (password.length === 0) {
      alert("Please insert a password");
      return;
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
            <Form.Control type="password" placeholder="Password" 
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
