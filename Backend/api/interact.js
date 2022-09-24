const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:7545");
const ethers = require("ethers");

const config = require("../config");

const contract = require("../artifacts/contracts/CrowdFunding.sol/Deployer.json");

const deployer = new web3.eth.Contract(contract.abi, config.contractAddress);

const getDeployedProjects = async () => {
	const deployedProjects = await deployer.methods.getDeployedProjects().call();
	console.log(deployedProjects);
};

const getDeployedProjectsLength = async () => {
	const result = await deployer.methods.getDeployedProjectsCount().call();
	console.log(result);
};

const createFunding = async (
	address,
	title,
	description,
	minimumContribution,
	duration,
	requiredAmount
) => {
	const fund = await deployer.methods
		.createFunding(
			minimumContribution,
			title,
			description,
			duration,
			requiredAmount
		)
		.send({
			from: "0x199a87570C0C202fe5D703423491B188552d7868",
			gas: 3000000,
		});

	console.log(fund);
};

getDeployedProjects();
getDeployedProjectsLength();
createFunding(
	"0x199a87570C0C202fe5D703423491B188552d7868",
	"Test",
	"This is a test to check whether this transaction takes place properly",
	ethers.utils.parseEther("0.1"),
	4,
	ethers.utils.parseEther("5")
);
