/* eslint-disable jest/valid-expect */

const { expect } = require("chai");
// const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

const Deployer = hre.ethers.getContractFactory("Deployer");
const CrowdFunding = hre.ethers.getContractFactory("CrowdFunding");

let owner, add1, add2;
let deployer;
let crowdFunding;
let crowdFundingAddress;

beforeEach(async () => {
	[owner, add1, add2] = await ethers.getSigners();
	// console.log(owner);
	deployer = await Deployer.deploy();
	// console.log(deployer);

	await deployer.methods
		.createFunding(
			ethers.utils.parseEther("0.1"),
			"Test",
			"This is a test to check whether this transaction takes place properly",
			4,
			ethers.utils.parseEther("5")
		)
		.send({ from: owner, gas: 3000000 });

	[crowdFundingAddress] = await deployer.methods.getDeployedProjects().call();

	crowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
	crowdFunding = await crowdFunding.attach(crowdFundingAddress);
});

describe("CrowdFunding", () => {
	it("marks caller as campaign manager", async () => {
		const manager = await crowdFunding.methods.owner.call();
		expect(manager).to.equals(owner.address);
	});
});

// describe("CrowdFunding Contract", () => {
// 	let owners;
// 	let CrowdFunding;
// 	let crowdFunding;
// 	beforeEach(async () => {
// 		owners = (await ethers.getSigners())[0];
// 		// console.log(owners);
// 		CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
// 	});

// 	it("Deploying the Contract", async () => {
// 		crowdFunding = await CrowdFunding.deploy(
// 			1000000,
// 			owners,
// 			"Test",
// 			"Test",
// 			45,
// 			2000000000000000000
// 		);
// 		console.log(`The contract is deployed at ${crowdFunding.address}`);
// 		expect(crowdFunding.address).to.exist;
// 	});

// 	it("Correct owner", async () => {
// 		const owner = await crowdFunding.admin();
// 		// console.log(owner);
// 		expect(owner).to.equals(owners.address);
// 	});

// 	//****************************************** */
// 	//** Contributing some amount of ether */

// 	it("Contributing to funding", async () => {
// 		// const contribute = await crowdFunding.contribute();
// 		const signers = await ethers.getSigners();
// 		const signer = await ethers.getSigner(signers[1].address);
// 		const txnHash = await signer.sendTransaction({
// 			to: crowdFunding.address,
// 			value: ethers.utils.parseEther("1"),
// 		});

// 		console.log(txnHash);
// 		expect(txnHash).to.exist;
// 	});

// 	it("Checking the Balance", async () => {
// 		const balance = await crowdFunding.getAmountReceived();
// 		console.log(balance);
// 		expect(balance).toString.equals(ethers.utils.parseEther("1"));
// 	});
// });
