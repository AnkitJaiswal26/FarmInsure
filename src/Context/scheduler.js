import { ethers } from "ethers";
import Wenb3Model from "web3modal";
import { SafeInsureABI, SafeInsureAddress } from "./constants";
const MY_PRIAVTE_KEY =
	"0x7a62aa11fa06bc5f21ef8819674ce87876b678f7e288b9c8347fdd3eff7faf89";

const web3Modal = new Wenb3Model();
const connection = await web3Modal.connect();
const provider = new ethers.providers.Web3Provider(connection);
const signer = new ethers.Wallet(MY_PRIAVTE_KEY, provider);

var sentmails = {};
var sentmailsCompany = {};
// const signer = provider.getSigner();
// TODO
const contract = new ethers.Contract(SafeInsureAddress, SafeInsureABI, signer);

// async function sendTransaction() {
// 	contract.myFunction();
// }

async function checkWeather() {
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
	const providers = await contract.fetchAllProviders();
	for (let i = 0; i < providers.length; i++) {
		const newContract = new ethers.Contract(
			providers[i],
			SafeInsureABI,
			signer
		);
		const contracts = await newContract.fetchAllContracts();
		for (let j = 0; j < contracts.length; j++) {
			const status = await newContract.checkClaimStatus(contracts[i]);
			if (status === true && sentmails[contracts[i]] === false) {
				sentmails[contracts[i]] = true;
				// TODO: axios request
			}
		}
	}
}

async function checkClaimStatusForCompany() {
	const providers = await contract.fetchAllProviders();
	for (let i = 0; i < providers.length; i++) {
		const newContract = new ethers.Contract(
			providers[i],
			SafeInsureABI,
			signer
		);
		const contracts = await newContract.fetchAllContracts();
		for (let j = 0; j < contracts.length; j++) {
			const status = await newContract.checkClaimStatus(contracts[i]);
			if (status === true && sentmailsCompany[contracts[i]] === false) {
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
