import axios from "../api";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import "../styles/ViewJob.css";
import moment from "moment";
import { MyContext } from "../context";

const ViewJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(MyContext);

  useEffect(() => {
    setLoading(true);
    axios.get(`/jobs/${id}`).then((response) => {
      setJob(response.data[0]);
      console.log(response.data);
      setLoading(false);
    });
  }, []);

  if (!loading && job) {
    return (
      <Container>
        <div className="view-card-container">
          <div className="view-container-logo">
            <img src={job.companyLogo} alt="logo" />
          </div>
          <div className="view-job-meta">
            <div className="view-job-meta-header">
              <h2>{job.title}</h2>
              {moment(job.postedAt).fromNow().includes("hours") && (
                <span className="company-tags">New</span>
              )}
              {job.featured && <span className="company-tags">Featured</span>}
            </div>
            <div>
              <div className="job-meta">
                <p>
                  {moment(job.postedAt).fromNow()} | {job.jobType} |{" "}
                  {job.location}
                </p>
              </div>
              <h6>Job Description</h6>
              <p>{job.description}</p>
            </div>
          </div>
          <div className="view-job-tags-container">
            <div className="view-job-tags-header">
              <h5>Preferred Languages :</h5>
            </div>
            <div className="view-job-tags">
              {job.preferredLanguage.length > 0 &&
                job.preferredLanguage.map((tag, i) => (
                  <p key={i} className="each-tags">
                    {tag}
                  </p>
                ))}
            </div>
          </div>
          <div className="view-job-contact">
            <Button variant="primary">
              {!user.isRecruiter ? (
                <a
                  style={{ color: "white", textDecoration: "none" }}
                  href={`mailto:${job.user[0].email}`}
                >
                  Send email
                </a>
              ) : (
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={`/edit-job/${job._id}`}
                >
                  Edit Job
                </Link>
              )}
            </Button>
          </div>
        </div>
      </Container>
    );
  } else return <Loading />;
};

export default ViewJob;
