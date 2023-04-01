require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: {
		version: "0.8.18",
		settings: { optimizer: { enabled: true, runs: 200 } },
	},
	paths: {
		artifacts: "./src/artifacts",
	},
	networks: {
		hardhat: {},
		polygon_mumbai: {
			url: `https://polished-attentive-film.matic-testnet.discover.quiknode.pro/30b6d013db1d5594d93f664dccea8fca81ca5b56/`,
			accounts: [
				"0x7a62aa11fa06bc5f21ef8819674ce87876b678f7e288b9c8347fdd3eff7faf89",
			],
			allowUnlimitedContractSize: true,
		},
	},
	etherscan: {
		apiKey: process.env.POLYGONSCAN_API_KEY,
	},
};
