import React, { useEffect, useState } from "react";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { ADMIN_NAVBAR_ELEMENTS, TRAVELER_NAVBAR_ELEMENTS, TRAVEL_AGENT_NAVBAR } from "../constant/NavbarConstants";

const NavbarView = () => {
  const [user, setUser] = useState(
    //      {
    //   username: "LWilliam",
    //   roles: ["admin"],
    // }
  );
  //     {
  //     username: "test",
  //     roles: ["admin"],
  //   }
  const [currentUserRole, setCurrentUserRole] = useState(user?.roles[0]);
  const [currentNavbarSelections, setcurrentNavbarSelections] = useState([]);

  useEffect(() => {
    setcurrentNavbarSelections(checkUserPreviledges());
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  const checkUserPreviledges = () => {
    if (user?.roles.includes("admin")) {
      return ADMIN_NAVBAR_ELEMENTS;
    } else if (user?.roles.includes("agent")) {
      return TRAVEL_AGENT_NAVBAR;
    } else if (user?.roles.includes("traveler")) {
      return TRAVELER_NAVBAR_ELEMENTS;
    } else {
      return [];
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand
          href="/"
          className="fw-bolder"
          onClick={() => localStorage.setItem("SelectedItem", "1")}
        >
          Ticker Reservations
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {currentNavbarSelections.map((element) => {
              return (
                <Nav.Link
                  key={element.id}
                  href={element.path}
                  onClick={() =>
                    localStorage.setItem("SelectedItem", element.id)
                  }
                  className={classnames(
                    localStorage.getItem("SelectedItem") == element.id
                      ? "fw-bolder"
                      : "fw-normal"
                  )}
                >
                  {element.title}
                </Nav.Link>
              );
            })}
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown title={user.username} id="collapsible-nav-dropdown">
                {currentUserRole === "traveler" ? (
                  <NavDropdown.Item href={`/traveler/profile`}>
                    My Profile
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item href={`/staff/profile`}>
                    My Profile
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="text-danger"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/login">
                <Button variant="btn btn-outline-primary">Sign Up</Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarView;
