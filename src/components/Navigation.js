import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context";
import "../styles/Navigation.css";

const Navigation = () => {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };
  return (
    <Navbar className="navigation-bar" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            Job Platform
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user && !user.isRecruiter && (
              <Nav.Link>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/search-jobs"
                >
                  Find Job
                </Link>
              </Nav.Link>
            )}
            {user && user.isRecruiter && (
              <NavDropdown title="Recruiter" id="basic-nav-dropdown">
                <NavDropdown.Item href="/post-job">Post Job</NavDropdown.Item>
                <NavDropdown.Item href="/manage-jobs">
                  Manage Jobs
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {!user ? (
              <Nav.Link>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/login"
                >
                  Login
                </Link>
              </Nav.Link>
            ) : (
              <Button
                className="logout"
                onClick={handleLogout}
                variant="danger"
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
