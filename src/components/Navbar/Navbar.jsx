import React from "react";
import { Container, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // custom styling

const Navbarr = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // remove saved user
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="custom-navbar shadow-sm">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="fw-bold brand-text">
          WorkFlow Hub
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapse */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-2">
            {!user ? (
              <>
                <Link to="/signup">
                  <Button variant="outline-light" className="px-4">
                    Signup
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="light" className="px-4">
                    Login
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {user.role === "manager" && (
                  <Link to="/manager">
                    <Button variant="outline-light" className="px-4">
                      Manager Dashboard
                    </Button>
                  </Link>
                )}
                {user.role === "employee" && (
                  <Link to="/employee">
                    <Button variant="outline-light" className="px-4">
                      Employee Dashboard
                    </Button>
                  </Link>
                )}
                <Button
                  variant="danger"
                  className="px-4"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;


