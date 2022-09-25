/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDeployedProjectsLength } from "../api/interact";
import "../components/css/Homepage.css";
import chainvector from "../assets/chain_vector.png";

function Homepage() {
	const [projectsCount, setProjectsCount] = useState("...");

	useEffect(() => {
		getDeployedProjectsLength()
			.then((result) => setProjectsCount(result))
			.catch((err) => console.log(err));
	}, []);

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
					<h5 className="home-proj-count ">
						There are currently <span>{projectsCount}</span> projects.
					</h5>
				</div>
				<img src={chainvector} />
			</div>
		</div>
	);
}

export default Homepage;
