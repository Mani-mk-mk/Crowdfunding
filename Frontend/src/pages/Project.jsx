function Project() {

  const [amount, setAmount] = useState(0);

  const amountChange = (e) => {
    setAmount(e.target.value);
  }

	return (
		<div>
			<div className="grey-box">
				<div className="home-text-left">
					<h1>Become a Contributor by contributing this project.</h1>
          <div className="input-box">
              <input
                type="number"
                name="contribute"
                id="contribute"
                value={goal}
                onChange={goalChange}
                placeholder="In ETH"
              />
            <button className="purple-btn">Contribute</button>
          </div>
				</div>
			</div>
		</div>
	);
}

export default Project;
