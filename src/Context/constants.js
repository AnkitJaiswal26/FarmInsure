// import insuranceProvider from "";
// import insuranceContract from "";
import safeInsure from "../artifacts/contracts/SafeInsure.sol/SafeInsure.json";

export const SafeInsureAddress = "0xd7A1F3177c7f3046c2632f4995f68aa385Ce971A";
export const SafeInsureABI = safeInsure.abi;

// export const InsuranceProviderAddress = "0x721D70B6BCa44C075b89cbc19A10537E9127E379";
// export const InsuranceProviderABI = insuranceProvider.abi;

// export const InsuranceContractAddress = "insuranceContractAddress.abi";
// export const InsuranceContractABI = insuranceContract.abi;

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
