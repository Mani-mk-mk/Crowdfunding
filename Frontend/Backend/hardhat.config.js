require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-ganache");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: {
		version: "0.8.9",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	networks: {
		ganache: {
			url: "http://127.0.0.1:7545",
			accounts: [
				`d799911358379e34ae8d1fdbf17dcaca5b0c193c2052e63156d71338958174e6`,
				`3d7854aad6abbb35f5474a30732bbd1e8993601ad2b851f3d7f6a92713186115`,
			],
		},
	},

	paths: {
		sources: "./contracts",
		tests: "./test",
		cache: "./cache",
		artifacts: "./artifacts",
	},
};
