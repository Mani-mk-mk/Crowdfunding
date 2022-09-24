import React from "react";
import { Link } from "react-router-dom";
import "../components/css/Homepage.css";
import chainvector from "../assets/chain_vector.png";

function Homepage() {
  return (
    <div>
      <div className="grey-box">
        <div className="home-text-left">
          <h1>Have a Project?</h1>
          <h1>Need Funding?</h1>
          <h5>You're in the right place!</h5>
          <Link to="/createproject">
            <button className="purple-btn">Create a project</button>
          </Link>
        </div>
        <img src={chainvector} />
      </div>
    </div>
  );
}

export default Homepage;
