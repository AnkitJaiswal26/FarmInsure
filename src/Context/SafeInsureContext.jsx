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

	const scheduler = async () => {
		const MY_PRIAVTE_KEY =
			"0x7a62aa11fa06bc5f21ef8819674ce87876b678f7e288b9c8347fdd3eff7faf89";

		const web3Modal = new Wenb3Model();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = new ethers.Wallet(MY_PRIAVTE_KEY, provider);

		var sentmails = {};
		var sentmailsCompany = {};

		console.log(signer);
		// const signer = provider.getSigner();
		// TODO
		const contract = new ethers.Contract(
			SafeInsureAddress,
			SafeInsureABI,
			signer
		);

		// async function sendTransaction() {
		// 	contract.myFunction();
		// }

		async function checkWeather() {
			console.log("Hell-1");
			const providers = await contract.fetchAllProviders();
			for (let i = 0; i < providers.length; i++) {
				const newContract = new ethers.Contract(
					providers[i],
					SafeInsureABI,
					signer
				);
				const contracts = await newContract.fetchAllContracts();
				for (let j = 0; j < contracts.length; j++) {
					await newContract.checkWeather(contracts[i]);
				}
			}
		}

		async function checkClaimStatus() {
			console.log("Hell0");
			const providers = await contract.fetchAllProviders();
			for (let i = 0; i < providers.length; i++) {
				const newContract = new ethers.Contract(
					providers[i],
					SafeInsureABI,
					signer
				);
				const contracts = await newContract.fetchAllContracts();
				for (let j = 0; j < contracts.length; j++) {
					const status = await newContract.checkClaimStatus(
						contracts[i]
					);
					if (status === true && sentmails[contracts[i]] === false) {
						sentmails[contracts[i]] = true;
						// TODO: axios request
					}
				}
			}
		}

		async function checkClaimStatusForCompany() {
			console.log("Hell1");
			const providers = await contract.fetchAllProviders();
			console.log(providers);
			for (let i = 0; i < providers.length; i++) {
				const newContract = new ethers.Contract(
					providers[i],
					SafeInsureABI,
					signer
				);
				const contracts = await newContract.fetchAllContracts();
				for (let j = 0; j < contracts.length; j++) {
					const status = await newContract.checkClaimStatus(
						contracts[i]
					);
					if (
						status === true &&
						sentmailsCompany[contracts[i]] === false
					) {
						sentmails[contracts[i]] = true;
						// TODO: axios request
					}
				}
			}
		}

		// setInterval(sendTransaction, 24 * 60 * 60 * 1000);
		setInterval(checkWeather, 24 * 60 * 60 * 1000);
		setInterval(checkClaimStatus, 24 * 60 * 60 * 1000);
		setInterval(checkClaimStatusForCompany, 24 * 60 * 60 * 1000);
	};

	scheduler();

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
		const contract = await connectingWithSafeInsureContractForAdmin();
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

	const uploadFilesToIPFS = async (file) => {
		try {
			// console.log(file);
			const cid = await web3Storage.put(file);
			return cid;
		} catch (err) {
			console.log(err);
		}
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
		console.log("data", data);
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
		console.log(
			"In context before",
			client,
			premium,
			payout,
			duration,
			cropLoc,
			cropType
		);
		await contract.newContract(
			client,
			premium,
			payout,
			duration,
			cropLoc,
			cropType
		);
		console.log("In context after");
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

	const fetchInsurance = async (contractAddress, id) => {
		const contract = await connectingWithInsuranceProviderContract(
			contractAddress
		);
		console.log("idddd", id, typeof id);
		const data = await contract.fetchInsurance(id);
		return data;
	};

	const fetchInsuranceAddress = async () => {
		const contract = await connectingWithSafeInsureContract();
		const data = await contract.fetchInsuranceAddress();
		return data;
	};

	const fetchAllInsurances = async () => {
		const contract = await connectingWithSafeInsureContract();
		const providers = await contract.fetchAllProviders();
		console.log(providers);
		// const companies = await contract.fetchAllCompanies();

		var result = [];
		for (let i = 0; i < providers.length; i++) {
			const newContract = await connectingWithInsuranceProviderContract(
				providers[i]
			);
			const temp = await newContract.fetchInsTypes();

			for (let j = 0; j < temp.length; j++) {
				result.push({
					contractAddress: providers[i],
					// companyAdd: companies[i].comAdd,
					// name: companies[i].name,
					// cin: companies[i].cin,
					id: temp[j].id,
					premium: temp[j].premium.toString(),
					payout: temp[j].payout.toString(),
					duration: temp[j].duration.toString(),
				});
			}
		}
		console.log(result);
		return result;
	};

	const fetchMyInsList = async (contractAdd) => {
		const contract = await connectingWithInsuranceProviderContract(
			contractAdd
		);
		const data = await contract.fetchInsTypes();
		return data;
	};

	const addNewInsuranceType = async (
		contractAdd,
		premium,
		payout,
		duration
	) => {
		const contract = await connectingWithInsuranceProviderContract(
			contractAdd
		);
		await contract.addInsType(premium, payout, duration);
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
				uploadFilesToIPFS,
				fetchAllInsurances,
				addNewInsuranceType,
				fetchMyInsList,
				fetchInsuranceAddress,
				newContract,
				fetchInsurance,
			}}
		>
			{children}
		</SafeInsureContext.Provider>
	);
};
