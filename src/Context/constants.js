// import insuranceProvider from "";
// import insuranceContract from "";
import safeInsure from "../artifacts/contracts/SafeInsure.sol/SafeInsure.json";
import insuranceProvider from "../artifacts/contracts/InsuranceProvider.sol/InsuranceProvider.json";
import insuranceContract from "../artifacts/contracts/InsuranceContract.sol/InsuranceContract.json";

export const SafeInsureAddress = "0x20a1A74A93449C6c8b5F4d89e868e2Bc00911e4d";
export const SafeInsureABI = safeInsure.abi;

export const InsuranceProviderABI = insuranceProvider.abi;
export const InsuranceContractABI = insuranceContract.abi;

export const ChainId = {
	MAINNET: 1,
	GOERLI: 5,
	POLYGON_MUMBAI: 80001,
	POLYGON_MAINNET: 137,
};

export let activeChainId = ChainId.POLYGON_MUMBAI;
export const supportedChains = [
	ChainId.GOERLI,
	ChainId.POLYGON_MAINNET,
	ChainId.POLYGON_MUMBAI,
];
