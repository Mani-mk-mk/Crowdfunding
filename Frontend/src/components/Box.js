import React from "react";
import moment from "moment";

// Contribute Button -> Frontend
// Create Request -> Frontend
// Approve Request -> Frontend
// My Projects -> Frontend, Backend
// function Box({ title, goal, amt_raised, end_date }) {

// A page for each project
// Become a contributor, contribute X ETH, contribute btn
// List of requests that can be accepted or rejected

// My projects -> create req / send txn

function Box({ props }) {
	return (
		<div className="grey-box-small">
			{console.log(props)}
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
				{props.amountCollected} ETH
			</h4>
			<h4>
				<span>Goal: </span> {props.goal} ETH
			</h4>
			<div className="contribute-btn">
				<button> Contribute </button>
			</div>
		</div>
	);
}

export default Box;
