import React, { useState, useEffect } from "react";
import "../components/css/Myprojects.css";
import Box from "../components/Box";
import {
	ownerProjectCount,
	ownerProjectDetails,
	getOwnerProjects,
} from "../api/interact";
import useMetamask from "../hooks/useMetamask";

function Myprojects() {
	const [projectsCount, setProjectsCount] = useState("0");
	const [myProjects, setMyProjects] = useState([]);

	const { account } = useMetamask();

	useEffect(() => {
		ownerProjectCount(account)
			.then((result) => setProjectsCount(result))
			.catch((err) => console.log(err));
	}, [account]);

	useEffect(() => {
		getOwnerProjects(account).then((addresses) => {
			for (let index = 0; index < addresses.length; index++) {
				ownerProjectDetails(addresses, index).then((proj) => {
					setMyProjects((data) => [
						...data.filter((item) => item.name !== proj.name),
						{ ...proj, id: index },
					]);
				});
			}
		});
	}, [account]);

	// console.log(myProjects);
	const ownerProject = true;
	return (
		<div className="browse-cont">
			{projectsCount === "0" ? (
				<h1 className="browse-proj-count"> There are no active projects</h1>
			) : (
				<div className="proj-grid">
					{myProjects.map((project) => (
						<Box props={{ ...project, ownerProject }} />
					))}
				</div>
			)}
		</div>
	);
}

export default Myprojects;
