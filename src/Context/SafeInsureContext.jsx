import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import Wenb3Model from "web3modal";
import {
	SafeInsureAddress,
	SafeInsureABI,
	InsuranceProviderABI,
	InsuranceContractABI,
	chainId,
	supportedChains,
} from "./constants";
// import SmartAccount from "@biconomy/smart-account";
// import { ChainId } from "@biconomy/core-types";
import { useAuth } from "./AuthContext";
import { Web3Storage } from "web3.storage";
import { useAuth as arcanaAuth } from "@arcana/auth-react";

// TODO: Uncomment the below lines after deploying
const fetchMainContract = (signerOrProvider) =>
	new ethers.Contract(SafeInsureAddress, SafeInsureABI, signerOrProvider);

const fetchInsuranceProvider = (contractAddress, signerOrProvider) =>
	new ethers.Contract(
		contractAddress,
		InsuranceProviderABI,
		signerOrProvider
	);

const fetchInsuranceContract = (contractAddress, signerOrProvider) =>
	new ethers.Contract(
		contractAddress,
		InsuranceContractABI,
		signerOrProvider
	);

// const options = {
// 	activeNetworkId: ChainId.POLYGON_MUMBAI,
// 	supportedNetworksIds: [
// 		ChainId.GOERLI,
// 		ChainId.POLYGON_MAINNET,
// 		ChainId.POLYGON_MUMBAI,
// 	],
// 	networkConfig: [
// 		{
// 			chainId: ChainId.POLYGON_MUMBAI,
// 			dappAPIKey: "59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3",
// 		},
// 	],
// };

export const SafeInsureContext = React.createContext();

export const useSafeInsureContext = () => useContext(SafeInsureContext);

export const SafeInsureProvider = ({ children }) => {
	const web3AccessToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEFjNjkxYTc1NTFBODU3MzIzMTE2MWZEMzUyMUFEQ0MyNWFEQzIyOWMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzM2MjY2MzYyMzQsIm5hbWUiOiJWSlRJSGFjayJ9.uy6sLbmvqoxFA6103tzsK-Ga0H_x_M9z_iYDoK4sPp0";
	const web3Storage = new Web3Storage({ token: web3AccessToken });
	const { currentAccount } = useAuth();
	const auth = arcanaAuth();

	const connectingWithSafeInsureContract = async () => {
		try {
			const arcanaProvider = await auth.connect();
			const provider = new ethers.providers.Web3Provider(arcanaProvider);
			const signer = provider.getSigner();
			const contract = fetchMainContract(signer);
			return contract;
		} catch (error) {
			console.log("Something went wrong while connecting with contract!");
		}
	};

	const connectingWithSafeInsureContractForAdmin = async () => {
		try {
			const web3Modal = new Wenb3Model();
			const connection = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(connection);
			const signer = provider.getSigner();
			const contract = fetchMainContract(signer);
			return contract;
		} catch (error) {
			console.log("Something went wrong while connecting with contract!");
		}
	};

	const connectingWithInsuranceProviderContract = async (contractAddress) => {
		try {
			const arcanaProvider = await auth.connect();
			const provider = new ethers.providers.Web3Provider(arcanaProvider);
			const signer = provider.getSigner();
			const contract = fetchInsuranceProvider(contractAddress, signer);
			return contract;
		} catch (error) {
			console.log("Something went wrong while connecting with contract!");
		}
	};

	const connectingWithInsuranceContract = async (contractAddress) => {
		try {
			const arcanaProvider = await auth.connect();
			const provider = new ethers.providers.Web3Provider(arcanaProvider);
			const signer = provider.getSigner();
			const contract = fetchInsuranceContract(contractAddress, signer);
			return contract;
		} catch (error) {
			console.log("Something went wrong while connecting with contract!");
		}
	};

	const registerUser = async (
		address,
		name,
		age,
		gender,
		email,
		mobileNo
	) => {
		const contract = await connectingWithSafeInsureContract();
		console.log(
			address,
			typeof name,
			typeof age,
			typeof gender,
			typeof email,
			typeof mobileNo
		);
		await contract.registerUser(
			address,
			name,
			age,
			gender,
			email,
			mobileNo
		);
	};

	const registerCompany = async (address, name, cin) => {
		const contract = await connectingWithSafeInsureContract();
		await contract.registerCompany(address, name, cin);
	};

	const acceptCompany = async (companyAdd) => {
		const contract = await connectingWithSafeInsureContractForAdmin();
		await contract.acceptCompany(companyAdd);
	};

	const rejectCompany = async (companyAdd) => {
		const contract = await connectingWithSafeInsureContractForAdmin();
		await contract.rejectCompany(companyAdd);
	};

	const fetchUserByAddress = async (userAdd) => {
		const contract = await connectingWithSafeInsureContract();
		const data = await contract.fetchUserByAddress(userAdd);
		return data;
	};

	const fetchCompanyByAddress = async (userAdd) => {
		const contract = await connectingWithSafeInsureContract();
		const data = await contract.fetchCompanyByAddress(userAdd);
		return data;
	};

	const fetchActiveRequests = async () => {
		const contract = await connectingWithSafeInsureContract();
		const data = await contract.fetchActiveRequests();
		return data;
	};

	const fetchAllCompanies = async () => {
		const contract = await connectingWithSafeInsureContract();
		const data = await contract.fetchAllCompanies();
		return data;
	};

	const fetchCompanyUsingCIN = async (cin) => {
		const contract = await connectingWithSafeInsureContract();
		const data = await contract.fetchCompanyUsingCIN(cin);
		return data;
	};

	const addNewFarm = async (
		userAdd,
		location,
		landArea,
		cropType,
		ipfsHash,
		fileName
	) => {
		const contract = await connectingWithSafeInsureContract();
		await contract.addNewFarm(
			userAdd,
			location,
			landArea,
			cropType,
			ipfsHash,
			fileName
		);
	};

	const fetchUserFarms = async () => {
		const contract = await connectingWithSafeInsureContract();
		const data = await contract.fetchUserFarms();
		return data;
	};

	const ownerIs = async () => {
		const contract = await connectingWithSafeInsureContractForAdmin();
		const data = await contract.OwnerIs();
		return data;
	};

	const newContract = async (
		contractAddress,
		client,
		premium,
		payout,
		duration,
		cropLoc,
		cropType
	) => {
		const contract = await connectingWithInsuranceProviderContract(
			contractAddress
		);
		await contract.newContract(
			client,
			premium,
			payout,
			duration,
			cropLoc,
			cropType
		);
	};

	const getInsurer = async (contractAddress) => {
		const contract = await connectingWithInsuranceProviderContract(
			contractAddress
		);
		const data = await contract.getInsurer();
		return data;
	};

	const getContractBalance = async (contractAddress) => {
		const contract = await connectingWithInsuranceProviderContract(
			contractAddress
		);
		const data = await contract.getContractBalance();
		return data;
	};

	const getContractStatus = async (contractAddress, address) => {
		const contract = await connectingWithInsuranceProviderContract(
			contractAddress
		);
		const data = await contract.getContractStatus(address);
		return data;
	};

	const getClaimStatus = async (contractAddress, address) => {
		const contract = await connectingWithInsuranceProviderContract(
			contractAddress
		);
		const data = await contract.getClaimStatus(address);
		return data;
	};

	return (
		<SafeInsureContext.Provider
			value={{
				registerUser,
				registerCompany,
				acceptCompany,
				rejectCompany,
				fetchUserByAddress,
				fetchCompanyByAddress,
				fetchActiveRequests,
				fetchAllCompanies,
				fetchCompanyUsingCIN,
				addNewFarm,
				fetchUserFarms,
				ownerIs,
			}}
		>
			{children}
		</SafeInsureContext.Provider>
	);
};
