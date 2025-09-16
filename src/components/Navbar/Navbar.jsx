import React from "react";
import { Container, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbarr = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  const handleLogout = () => {
    setUser(null); // Clear parent state
    localStorage.removeItem("user"); // Clear localStorage
    navigate("/login");
  };

  // Determine if we are on login or signup page
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <Navbar expand="lg" className="custom-navbar shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold brand-text">
          WorkFlow Hub
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-2">

            {/* Always show Signup/Login on /login or /signup pages */}
            {isAuthPage && (
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
            )}

            {/* Show Dashboard + Logout on other pages if user is logged in */}
            {!isAuthPage && user && (
              <>
                <Link to={user.role === "manager" ? "/manager" : "/employee"}>
                  
                </Link>
                <Button variant="danger" className="px-4" onClick={handleLogout}>
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


