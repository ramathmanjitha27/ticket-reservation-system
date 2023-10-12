import React, { useEffect, useState } from "react";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";

const travelAgentNavElements = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Reservations", path: "/reservations" },
  { id: 3, title: "Travelers", path: "/travelers" },
];

const adminNavElements = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Reservations", path: "/reservations" },
  { id: 3, title: "Travelers", path: "/travelers" },
  { id: 4, title: "Trains", path: "/trains" },
];

const travelerNavElements = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "My Reservations", path: "/reservations" },
  { id: 3, title: "My Bookings", path: "/travelers" },
];

const NavbarView = () => {
  const [user, setUser] = useState(
        {
      username: "test",
      roles: ["admin"],
    }
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
      return adminNavElements;
    } else if (user?.roles.includes("agent")) {
      return travelAgentNavElements;
    } else if (user?.roles.includes("traveler")) {
      return travelerNavElements;
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
                {/* {
                    user.roles.length > 1 && (
                        <NavDropdown.Item onClick={}>
                            Switch Role
                        </NavDropdown.Item>
                    )
                } */}
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
