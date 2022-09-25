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
      url: "http://0.0.0.0:7545",
      accounts: [
        // `d799911358379e34ae8d1fdbf17dcaca5b0c193c2052e63156d71338958174e6`,
        // `3d7854aad6abbb35f5474a30732bbd1e8993601ad2b851f3d7f6a92713186115`,
        "893e125e100acea18bdfa8c62c3b988d6f3e2a8325f9b0fae6b19d809dbbf2aa",
        "3de790e2ab7c3181edcf0f3394a36ab7959c074339c4d57875b236aae8c9c833",
      ],
    },
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "../src/artifacts",
  },
};

// npx hardhat run scripts/deploy.js --network ganache
