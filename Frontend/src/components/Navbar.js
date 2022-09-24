import React, { useState } from "react";
import { Link } from "react-router-dom";
import useMetamask from "../hooks/useMetamask";
import "./css/Navbar.css";

function Navbar() {
	const [isSignedIn, setisSignedIn] = useState(true);

	const { connect, disconnect, account } = useMetamask();

	return (
		<nav className="navbar">
			<Link style={{ textDecoration: "none" }} to="/">
				<h1 className="nav-title">Sasta Kickstarter</h1>
			</Link>
			{!isSignedIn ? (
				<ul className="nav-text-right">
					<li>
						<button onClick={connect} className="purple-btn">
							Sign in
						</button>
					</li>
				</ul>
			) : (
				// For testing purpose
				// <ul className="nav-text-right">
				// 	<li>
				// 		<button onClick={connect} className="purple-btn">
				// 			Sign in
				// 		</button>
				// 	</li>
				//  </ul>

				<ul className="nav-text-right">
					<li>
						<Link style={{ textDecoration: "none" }} to="/browse">
							<h4>Browse</h4>
						</Link>
					</li>
					<li>
						<Link style={{ textDecoration: "none" }} to="/myprojects">
							<h4>My Projects</h4>
						</Link>
					</li>
				</ul>
			)}
		</nav>
	);
}

export default Navbar;
