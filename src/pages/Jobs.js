import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import JobCardList from "../components/JobCardList";
import { MyContext } from "../context";
import axios from "../api";
import Loading from "../components/Loading";

const Jobs = () => {
  const navigate = useNavigate();
  const { user } = useContext(MyContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
    if (user && user.isRecruiter) navigate("/manage-jobs");
    if (user && !user.isRecruiter) {
      setLoading(true);
      axios
        .get("/jobs")
        .then((response) => {
          setJobs(response.data.reverse());
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (loading) return <Loading />;
  return (
    <Container>
      {jobs.map((job) => (
        <JobCardList key={job._id} job={job} />
      ))}
    </Container>
  );
};

export default Jobs;
