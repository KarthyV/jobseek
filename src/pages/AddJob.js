import axios from "../api";
import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState("");
  const { user } = useContext(MyContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      title,
      description,
      jobType,
      location,
      preferredLanguage: languages.split(","),
      companyLogo: user.profilePicture,
      companyName: user.name,
      user_id: user._id,
    };
    axios
      .post("/jobs", { values })
      .then((response) => {
        if (response.status === 201) {
          navigate("/manage-jobs");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter job title"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Job Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter job Description"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contract Type</Form.Label>
          <Form.Control
            type="text"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            placeholder="Enter employee contract type"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter the job location"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tools Preferred</Form.Label>
          <Form.Control
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="Enter tools splitted by ','"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddJob;
