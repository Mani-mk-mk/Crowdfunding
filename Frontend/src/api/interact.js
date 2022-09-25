const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:7545");
// const web3 = new Web3(window.ethereum);

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
		return deployer.methods
			.createFunding(
				web3.utils.toWei(minimumContribution, "ether"),
				title,
				description,
				duration,
				web3.utils.toWei(requiredAmount, "ether")
			)
			.send({
				from: address,
				gas: 3000000,
			});
	} catch (error) {
		console.log(error);
	}
};

const contribute = async (index, amount, address) => {
	try {
		const contractAddress = (await getDeployedProjects())[index];
		const crowdFunding = new web3.eth.Contract(
			crowdFundingContract.abi,
			contractAddress
		);
		await crowdFunding.methods.contribute().send({
			from: address,
			value: web3.utils.toWei(amount, "ether"),
			gas: 3000000,
		});
	} catch (error) {
		console.log(error);
		return false;
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
	console.log(contractAddress);
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

//Change that shit smh
const getOwnerProjects = async (_address) => {
	const counter = await deployer.methods.counter(_address).call();
	const addresses = [];
	console.log(counter);
	for (let index = 0; index < counter; index++) {
		const project = await deployer.methods
			.ownersProjects(_address, index)
			.call();
		addresses.push(project);
	}
	console.log(addresses);
	return addresses;
};

const ownerProjectCount = async (_address) => {
	const count = await deployer.methods.counter(_address).call();
	return count;
};

const ownerProjectDetails = async (addresses, index) => {
	const address = addresses[index];
	const crowdFunding = new web3.eth.Contract(crowdFundingContract.abi, address);

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

	console.log(result);

	return result;
};

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
	getOwnerProjects,
	ownerProjectCount,
	ownerProjectDetails,
};
