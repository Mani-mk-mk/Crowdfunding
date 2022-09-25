const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:7545");
const { ethers } = require("ethers");

const config = require("../config");

const contract = require("../artifacts/contracts/CrowdFunding.sol/Deployer.json");
const crowdFundingContract = require("../artifacts/contracts/CrowdFunding.sol/CrowdFunding.json");

const deployer = new web3.eth.Contract(contract.abi, config.contractAddress);

const getDeployedProjects = async () => {
	const deployedProjects = await deployer.methods.getDeployedProjects().call();
	// console.log(deployedProjects);
	return deployedProjects;
};

const getDeployedProjectsLength = async () => {
	const result = await deployer.methods.getDeployedProjectsCount().call();
	// console.log(result);
	return result;
};

const createFunding = async (
	address,
	title,
	description,
	minimumContribution,
	duration,
	requiredAmount
) => {
	console.log(
		address,
		title,
		description,
		minimumContribution,
		duration,
		requiredAmount
	);
	// console.log(web3.eth.getAccounts());
	console.log("trying to deploy");
	try {
		await deployer.methods
			.createFunding(
				ethers.utils.parseEther(minimumContribution),
				title,
				description,
				duration,
				ethers.utils.parseEther(requiredAmount)
			)
			.send({
				from: address,
				gas: 3000000,
			});
	} catch (error) {
		console.log(error);
	}

	// console.log(fund);
};

// getDeployedProjects();
// getDeployedProjectsLength();
// createFunding(
// 	"0x199a87570C0C202fe5D703423491B188552d7868",
// 	"Test",
// 	"This is a test to check whether this transaction takes place properly",
// 	ethers.utils.parseEther("0.1"),
// 	4,
// 	ethers.utils.parseEther("5")
// );

//Create interact script for CrowdFunding Contract now

const contribute = async (index, amount, address) => {
	try {
		const contractAddress = (await getDeployedProjects())[index];
		const crowdFunding = new web3.eth.Contract(
			crowdFundingContract.abi,
			contractAddress
		);
		await crowdFunding.methods.contribute().send({
			from: address,
			value: amount,
			gas: 3000000,
		});
	} catch (error) {
		console.log(error);
	}
	return true;
};

const isContributor = async (index, address) => {
	const contractAddress = (await getDeployedProjects())[index];
	const crowdFunding = new web3.eth.Contract(
		crowdFundingContract.abi,
		contractAddress
	);

	const isContributor = await crowdFunding.methods.contributors(address).call();
	return isContributor;
};

const getOwner = async (index) => {
	const contractAddress = (await getDeployedProjects())[index];
	const crowdFunding = new web3.eth.Contract(
		crowdFundingContract.abi,
		contractAddress
	);

	const owner = await crowdFunding.methods.admin().call();
	return owner;
};

const getBalanceOf = async (index) => {
	const contractAddress = (await getDeployedProjects())[index];
	const crowdFunding = new web3.eth.Contract(
		crowdFundingContract.abi,
		contractAddress
	);

	const balance = await crowdFunding.methods.getAmountReceived().call();
	// console.log(balance);
	return balance;
};

const createRequest = async (
	index,
	description,
	amount,
	receipent,
	address
) => {
	const contractAddress = (await getDeployedProjects())[index];
	const crowdFunding = new web3.eth.Contract(
		crowdFundingContract.abi,
		contractAddress
	);

	try {
		await crowdFunding.methods
			.createRequest(description, amount, receipent)
			.send({
				from: address,
				gas: 3000000,
			});
	} catch (error) {
		console.error(
			"This is a owner only function -> only owner of a campaign can create a request"
		);
		console.log(error);
	}
	return true;
};

const timeRemaining = async (index) => {
	const contractAddress = (await getDeployedProjects())[index];
	const crowdFunding = new web3.eth.Contract(
		crowdFundingContract.abi,
		contractAddress
	);

	const time = await crowdFunding.methods.timeRemaining().call();
	// console.log(time);
	return time;
};

const getDetails = async (index) => {
	const contractAddress = (await getDeployedProjects())[index];
	const crowdFunding = new web3.eth.Contract(
		crowdFundingContract.abi,
		contractAddress
	);

	const name = await crowdFunding.methods.name().call();
	const description = await crowdFunding.methods.description().call();
	const endDate = await crowdFunding.methods.endDate().call();
	const goal = await crowdFunding.methods.requiredFund().call();
	const amountCollected = await crowdFunding.methods.getAmountReceived().call();

	const result = {
		name: name,
		description: description,
		goal: web3.utils.fromWei(goal, "ether"),
		endDate: new Date(endDate * 1000).toISOString(),
		amountCollected: web3.utils.fromWei(amountCollected, "ether"),
	};

	// console.log(result);

	return result;
};

const approveRequest = async (index, requestIndex, address) => {
	const contractAddress = (await getDeployedProjects())[index];
	const crowdFunding = new web3.eth.Contract(
		crowdFundingContract.abi,
		contractAddress
	);

	try {
		await crowdFunding.methods.approveRequest(requestIndex).send({
			from: address,
			gas: 3000000,
		});
	} catch (error) {
		console.log(error);
	}
	return true;
};

const finalizeRequest = async (index, requestIndex, address) => {
	const contractAddress = (await getDeployedProjects())[index];
	const crowdFunding = new web3.eth.Contract(
		crowdFundingContract.abi,
		contractAddress
	);

	try {
		await crowdFunding.methods.sendTransaction(requestIndex).send({
			from: address,
			gas: 3000000,
		});
	} catch (error) {
		console.log(error);
	}
	return true;
};

// contribute(
// 	0,
// 	ethers.utils.parseEther("1"),
// 	"0x7Ee0e98D96876839525e8C678c8823aFB2D900d3"
// );

getDetails(0);

module.exports = {
	getDeployedProjects,
	getDeployedProjectsLength,
	createFunding,
	contribute,
	isContributor,
	getOwner,
	createRequest,
	timeRemaining,
	approveRequest,
	finalizeRequest,
	getBalanceOf,
	getDetails,
};
