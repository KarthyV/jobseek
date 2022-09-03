import axios from "../api";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../context";
import Loading from "../components/Loading";

const EditJob = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/jobs/${id}`)
      .then(({ data }) => {
        setTitle(data[0].title);
        setDescription(data[0].description);
        setJobType(data[0].jobType);
        setLocation(data[0].location);
        setLanguages(data[0].preferredLanguage.join(","));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

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
      .patch(`/jobs/${id}`, { values })
      .then((response) => {
        if (response.status === 200) {
          navigate("/manage-jobs");
        }
      })
      .catch((error) => console.log(error));
  };

  if (loading) return <Loading />;
  else
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
            Save Changes
          </Button>
        </Form>
      </Container>
    );
};

export default EditJob;
