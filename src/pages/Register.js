import axios from "../api";
import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePictureLink, setProfilePictureLink] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(MyContext);

  useEffect(() => {
    if (user && user.isRecruiter) navigate("/manage-jobs");
    if (user) navigate("/jobs");
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("/user/register", {
        name,
        email,
        password,
        checkbox,
        profilePictureLink,
      })
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));

        response.data.isRecruiter
          ? navigate("/manage-jobs")
          : navigate("/jobs");
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
    setLoading(false);
  };
  return (
    <Container className="form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>{checkbox ? "Company" : "JobSeeker"} Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            {checkbox ? "Company" : "JobSeeker"} Profile Picture Link
          </Form.Label>
          <Form.Control
            type="text"
            value={profilePictureLink}
            onChange={(e) => setProfilePictureLink(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            checked={checkbox}
            onChange={(e) => setCheckbox(e.target.checked)}
            type="checkbox"
            label="Are you an Recruiter? If yes!"
          />
        </Form.Group>
        <Button disabled={isLoading} variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/login">
          <p style={{ marginTop: "10px" }}>Already have an account?</p>
        </Link>
      </Form>
    </Container>
  );
};

export default Register;
