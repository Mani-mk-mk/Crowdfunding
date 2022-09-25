import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useMetamask from "../hooks/useMetamask";
import { createFunding } from "../api/interact";
import moment from "moment";
import "../components/css/CreateProject.css";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goal, setGoal] = useState("");

  const { account } = useMetamask();
  const navigate = useNavigate();
  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // const startDateChange = (e) => {
  //   setStartDate(e.target.value);
  // };
  const endDateChange = (e) => {
    setEndDate(e.target.value);
  };
  const goalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    createProject(title, description, goal).then(() => navigate("/browse"));
  };
  const calculateDuration = () => {
    const date = new Date();
    const startDate = date.toDateString();
    const start = moment(startDate);
    const end = moment(endDate);

    const duration = end.diff(start, "days");
    // console.log(duration);
    return duration;
  };

  const createProject = async (_title, _description, _goal) => {
    const duration = calculateDuration();
    const result = await createFunding(
      account,
      _title,
      _description,
      "0.0009",
      duration,
      `${_goal}`
    );

    console.log(result);
  };

  return (
    <div className="grey-box">
      <div className="proj-form-container">
        <h1>Create a Project</h1>
        <form action="" className="proj-form" onSubmit={handleSubmit}>
          <label htmlFor="proj-title">
            Project title
            <input
              type="text"
              name="proj-title"
              id="proj-title"
              value={title}
              onChange={titleChange}
            />
            {/* {title} */}
          </label>
          <label htmlFor="proj-desc">
            Project description
            <textarea
              rows="4"
              cols="23"
              name="proj-desc"
              id="pro-desc"
              value={description}
              onChange={descriptionChange}
            ></textarea>
          </label>
          {/* <label htmlFor="proj-start-date">
            Start Date
            <input
              type="date"
              name="proj-start-date"
              id="proj-start-date"
              value={startDate}
              onChange={startDateChange}
            /> 
            </label>
            */}

          <label htmlFor="proj-end-date">
            End Date
            <input
              type="date"
              name="proj-end-date"
              id="proj-end-date"
              value={endDate}
              onChange={endDateChange}
            />
          </label>
          <label htmlFor="goal">
            Goal Amount
            <input
              type="number"
              name="goal"
              id="goal"
              value={goal}
              onChange={goalChange}
              placeholder="In ETH"
              step="any"
            />
          </label>
          <button type="submit" className="purple-btn" disabled={submitted}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
