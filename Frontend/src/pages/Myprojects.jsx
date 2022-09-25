import React, { useState, useEffect } from "react";
import "../components/css/Myprojects.css";
import Box from "../components/Box";
import { getDeployedProjectsLength } from "../api/interact";

function Myprojects() {
	const [projectsCount, setProjectsCount] = useState("0");

	useEffect(() => {
		getDeployedProjectsLength()
			.then((result) => setProjectsCount(result))
			.catch((err) => console.log(err));
	}, []);
	return (
		<div className="browse-cont">
			{projectsCount === "0" ? (
				<h1 className="browse-proj-count"> There are no active projects</h1>
			) : (
				<div className="proj-grid">
					<Box />
				</div>
			)}
		</div>
	);
}

export default Myprojects;
