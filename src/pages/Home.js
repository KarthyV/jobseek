import React, { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(MyContext);

  const handleNavigate = () => {
    if (!user) navigate("/login");
    else if (user && user.isRecruiter) navigate("/manage-jobs");
    else navigate("/jobs");
  };

  return (
    <div className="home-page-banner">
      <h1>Find Your Career. You Deserve it</h1>
      <p>Are you an Recruiter, Looking for candidates, Register as recruiter</p>
      <Button onClick={handleNavigate} variant="primary">
        Explore Now
      </Button>
    </div>
  );
};

export default Home;
