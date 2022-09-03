import axios from "../api";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { user, setUser } = useContext(MyContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.isRecruiter) navigate("/manage-jobs");
    if (user) navigate("/jobs");
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    axios
      .post("/user/login", { email, password })
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
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Link to="/register">
          <p>Don't have an account?</p>
        </Link>
        <Button disabled={isLoading} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
