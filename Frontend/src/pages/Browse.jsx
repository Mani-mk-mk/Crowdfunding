import React, { useState, useEffect } from "react";
import "../components/css/Browse.css";
import Box from "../components/Box";
import { getDeployedProjectsLength, getDetails } from "../api/interact";
const testData = [
  {
    title: "Project Alpha",
    end_date: "26th sep 2023",
    amt_raised: 10,
    goal: 40,
  },
  {
    title: "Project Zero Dawn",
    end_date: "26th sep 2023",
    amt_raised: 13,
    goal: 50,
  },
];
function Browse() {
  const [projectsCount, setProjectsCount] = useState(0);
  const [deployedProjs, setDeployedProjs] = useState([]);

  useEffect(() => {
    getDeployedProjectsLength()
      .then((result) => {
        setProjectsCount(result);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    for (let i = 0; i < projectsCount; i++) {
      getDetails(i).then((proj) => {
        // console.log(proj);
        setDeployedProjs((data) => [
          ...data.filter((item) => item.name !== proj.name),
          { ...proj, id: i },
        ]);
      });
    }
  }, [projectsCount]);
  return (
    <div className="browse-cont">
      {projectsCount === "0" ? (
        <h1 className="browse-proj-count"> There are no active projects</h1>
      ) : (
        <div className="proj-grid">
          {deployedProjs.map((project) => (
            <Box props={{ ...project }} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Browse;
