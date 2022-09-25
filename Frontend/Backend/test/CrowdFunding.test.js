const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("CrowdFunding Contract", () => {
	let owners;
	let CrowdFunding;
	let crowdFunding;
	beforeEach(async () => {
		owners = (await ethers.getSigners())[0];
		// console.log(owners);
		CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
	});

	it("Deploying the Contract", async () => {
		crowdFunding = await CrowdFunding.deploy(
			1000000,
			owners,
			"Test",
			"Test",
			45,
			2000000000000000000
		);
		console.log(`The contract is deployed at ${crowdFunding.address}`);
		expect(crowdFunding.address).to.exist;
	});

	it("Correct owner", async () => {
		const owner = await crowdFunding.admin();
		// console.log(owner);
		expect(owner).to.equals(owners.address);
	});

	//****************************************** */
	//** Contributing some amount of ether */

	it("Contributing to funding", async () => {
		// const contribute = await crowdFunding.contribute();
		const signers = await ethers.getSigners();
		const signer = await ethers.getSigner(signers[1].address);
		const txnHash = await signer.sendTransaction({
			to: crowdFunding.address,
			value: ethers.utils.parseEther("1"),
		});

		console.log(txnHash);
		expect(txnHash).to.exist;
	});

	it("Checking the Balance", async () => {
		const balance = await crowdFunding.getAmountReceived();
		console.log(balance);
		expect(balance).toString.equals(ethers.utils.parseEther("1"));
	});
});
