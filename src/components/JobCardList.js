import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/JobCardList.css";
import moment from "moment";

const JobCardList = ({ job, recruiter, toDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/view-job/${job._id}`)}
      className="list-card-container"
    >
      <div className="job-card-right">
        <div className="logo-container">
          <img className="job-card-logo" src={job.companyLogo} alt="logo" />
        </div>
        <div className="job-card-right-details">
          <div className="job-about">
            <h6>{job.companyName}</h6>
            {moment(job.postedAt).fromNow().includes("hours") ||
              (moment(job.postedAt).fromNow().includes("minutes") && (
                <span className="company-tags">New</span>
              ))}
            {job.featured && <span className="company-tags">Featured</span>}
          </div>
          <div className="job-position">
            <h4 className="job-position">{job.title}</h4>
          </div>
          <div className="job-meta">
            <p>
              {moment(job.postedAt).fromNow()} | {job.jobType} | {job.location}
            </p>
          </div>
        </div>
      </div>
      <div className="job-tags">
        {job.preferredLanguage.length > 0 &&
          job.preferredLanguage.map((tag, i) => (
            <p key={i} className="each-tags">
              {tag}
            </p>
          ))}
      </div>
      {recruiter && (
        <div className="recruiter-action">
          <Button onClick={() => toDelete(job._id)} variant="danger">
            <i className="fa-solid fa-trash"></i>
          </Button>
          <Button
            onClick={() => navigate(`/edit-job/${job._id}`)}
            variant="info"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobCardList;
