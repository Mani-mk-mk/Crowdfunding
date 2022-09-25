import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../components/css/Project.css";
import { getDetails, contribute } from "../api/interact";
import moment from "moment";
import useMetamask from "../hooks/useMetamask";

function Project({}) {
  const [amount, setAmount] = useState(0);
  const { id } = useParams();

  const { isActive, account, isLoading, connect, disconnect, shouldDisable } =
    useMetamask();
  const navigate = useNavigate();
  const amountChange = (e) => {
    setAmount(e.target.value);
  };

  const [data, setData] = useState("");

  useEffect(() => {
    getDetails(id).then((response) => {
      setData(response);
      // console.log(response);
    });
  }, []);

  const handleContribute = (_id, _amount, _receipent) => {
    contribute(_id, _amount, _receipent).then((response) => {
      navigate("/browse");
    });
  };

  console.log(data);

  return (
    <div>
      <div className="grey-box">
        <div className="home-text-left">
          <div className="project-container">
            <div className="project-details">
              <h1>{data.name}</h1>
              <h5>
                <span>Description:</span> {data.description}
              </h5>
              <h5>
                <span>Last Date: </span>
                {moment(data.endDate).format("DD-MM-YYYY")}
              </h5>
              <h5>
                <span>Amount Raised: </span>
                <p
                  className={
                    parseInt(data.amountCollected) > parseInt(data.goal)
                      ? "green-txt"
                      : "red-txt"
                  }
                >
                  {data.amountCollected}
                </p>{" "}
                ETH
              </h5>
              <h5>
                <span>Goal: </span> {data.goal} ETH
              </h5>
            </div>
            <div className="input-box">
              <input
                type="number"
                min="0"
                name="contribute"
                id="contribute"
                value={amount}
                onChange={amountChange}
                placeholder="In ETH"
                step="any"
              />
              <button
                className="purple-btn"
                onClick={() => handleContribute(id, amount, account)}
              >
                Contribute
              </button>
            </div>
            <h5 id="contributor-text">
              Become a Contributor by funding this project.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
