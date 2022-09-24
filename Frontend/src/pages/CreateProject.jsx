import { useState } from "react";
import { Link } from "react-router-dom";
import "../components/css/CreateProject.css";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const startDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const endDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            {title}
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
          <label htmlFor="proj-start-date">
            Start Date
            <input
              type="date"
              name="proj-start-date"
              id="proj-start-date"
              value={startDate}
              onChange={startDateChange}
            />
          </label>
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
          <Link to="/myprojects">
            <button type="submit" className="purple-btn">
              Create
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
