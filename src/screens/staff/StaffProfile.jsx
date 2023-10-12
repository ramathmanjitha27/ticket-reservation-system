import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStaff } from "../../hooks/api/useStaff";
import LoadingView from "../../components/LoadingView";

const StaffProfile = () => {
  const navigate = useNavigate();
  const { getStaffMemberById, updateStaffMember } = useStaff();

  const [fullName, setFullName] = useState("full name 1");
  const [username, setUsername] = useState("username 1");
  const [email, setEmail] = useState("email 1");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState(["agent"]);
  const [isActivated, setIsActivated] = useState(false);
  const [travelerIds, setTravelerIds] = useState([]);
  const [userImg, setUserImg] = useState(
    "https://th.bing.com/th/id/OIP.CdCBHghVSFo33i1WsW5zXwHaHa?pid=ImgDet&rs=1"
  );
  const [staffId, setStaffId] = useState("652729a0aa4a0ec253b4c68e");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getStaffDetails();
  }, []);

  const getStaffDetails = async () => {
    setIsLoading(true);
    const memberDetails = await getStaffMemberById(staffId);

    if (memberDetails) {
      setFullName(memberDetails.fullName);
      setUsername(memberDetails.username);
      setEmail(memberDetails.email);
      setPassword(memberDetails.password);
      setRoles(memberDetails.roles);
      setIsActivated(memberDetails.isActivated);
      setTravelerIds(memberDetails.travelerIds);

      setIsLoading(false);
    }
  };

  const onEditClick = () => {
    navigate("/staff/update", {
      state: {
        fullName,
        username,
        email,
        password,
        roles,
        isActivated,
        travelerIds,
        userImg,
      },
    });
  };

  const onDeactivateClick = async () => {
    setIsActivated(false);

    // make the backend call here...
    const inputObj = {
      Id: staffId,
      Username: username,
      FullName: fullName,
      Email: email,
      Password: password,
      Roles: roles,
      IsActivated: false,
      TravelerIds: travelerIds,
    };

    const responseData = await updateStaffMember(staffId, inputObj);

    if (responseData) {
      alert("Your account Deactivated!");
      navigate("/");
    } else {
      alert("Deactivation is not successful!, Please try again");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: "85vh", minHeight: "85vh" }} className="my-5">
        <Card.Header className="d-flex justify-content-center">
          <div>
            <h3 className="mb-5 mt-3">Your Profile</h3>
            <img
              src={userImg}
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "70px",
                objectFit: "cover",
              }}
              alt="profile pic"
            />
            <div className="block justify-content-center text-center my-3">
              <div className="fw-bold fs-5">{username}</div>
              <div> {roles} </div>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="d-flex justify-content-center flex-column justify-content-between ">
          {isLoading ? (
            <LoadingView />
          ) : (
            <>
              <div className="my-5">
                <Row className="mb-2">
                  <Col className="d-flex justify-content-center">Full Name</Col>
                  <Col>{fullName}</Col>
                  <div className="d-flex justify-content-center ">
                    <hr style={{ width: "70vh" }} />
                  </div>
                </Row>
                <Row className="mb-2">
                  <Col className="d-flex justify-content-center">User Name</Col>
                  <Col>{username}</Col>
                  <div className="d-flex justify-content-center ">
                    <hr style={{ width: "70vh" }} />
                  </div>
                </Row>
                <Row className="mb-2">
                  <Col className="d-flex justify-content-center">
                    Email Address
                  </Col>
                  <Col>{email}</Col>
                  <div className="d-flex justify-content-center ">
                    <hr style={{ width: "70vh" }} />
                  </div>
                </Row>
                <Row className="mb-2">
                  <Col className="d-flex justify-content-center">
                    User Roles
                  </Col>
                  <Col>{roles}</Col>
                  <div className="d-flex justify-content-center ">
                    <hr style={{ width: "70vh" }} />
                  </div>
                </Row>
              </div>
              <div className="d-flex justify-content-between">
                <Button variant="primary" onClick={onEditClick}>
                  Edit Details
                </Button>
                <Button variant="danger" onClick={onDeactivateClick}>
                  Deactivate
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default StaffProfile;
