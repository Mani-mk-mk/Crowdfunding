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
		crowdFunding = await CrowdFunding.deploy(1000000);

		// console.log(crowdFunding.address);

		expect(crowdFunding.address).to.exist;
	});

	it("Correct owner", async () => {
		const owner = await crowdFunding.admin();
		// console.log(owner);
		expect(owner).to.equals(owners.address);
	});
});
