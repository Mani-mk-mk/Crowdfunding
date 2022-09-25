import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

// Contribute Button -> Frontend

// Create Request -> Frontend
// Approve Request -> Frontend
// List of requests that can be accepted or rejected

// My Projects -> Frontend, Backend

// A page for each project
// Become a contributor, contribute X ETH, contribute btn

// My projects -> create req / send txn

function Box({ props }) {
	return (
		<div className="grey-box-small">
			{/* {console.log(props)} */}
			<h1>{props.name}</h1>
			<h3>
				<span>Description:</span> {props.description}
			</h3>
			<h3>
				<span>Last Date: </span>
				{moment(props.endDate).format("DD-MM-YYYY")}
			</h3>
			<h4>
				<span>Amount Raised: </span>
				<p
					className={
						parseInt(props.amountCollected) > parseInt(props.goal)
							? "green-txt"
							: "red-txt"
					}
				>
					{props.amountCollected} ETH
				</p>{" "}
			</h4>
			<h4>
				<span>Goal: </span> {props.goal} ETH
			</h4>
			<div style={{ marginTop: "24px" }}>
				<Link to={`/project/${props.id}`} className="contribute-btn purple-btn">
					{props.ownerProject ? "View Funding" : "Contribute"}
				</Link>
			</div>
		</div>
	);
}

export default Box;
