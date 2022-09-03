import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import JobCardList from "../components/JobCardList";
import { MyContext } from "../context";
import axios from "../api";
import Loading from "../components/Loading";

const ManageJobs = () => {
  const navigate = useNavigate();
  const { user } = useContext(MyContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = (JobId) => {
    axios
      .delete(`jobs/${JobId}`)
      .then((response) => setJobs(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!user) navigate("/login");
    if (user && !user.isRecruiter) navigate("/jobs");
    if (user && user.isRecruiter) {
      setLoading(true);
      axios
        .get(`/jobs/manage-jobs/${user._id}`)
        .then((response) => {
          setJobs(response.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (loading) return <Loading />;
  return (
    <Container>
      {jobs.map((job) => (
        <JobCardList
          recruiter
          toDelete={handleDelete}
          key={job._id}
          job={job}
        />
      ))}
    </Container>
  );
};

export default ManageJobs;
