import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAuth as arcanaAuth } from "@arcana/auth-react";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState("");

	const auth = arcanaAuth();

	const connectUsingArcana = async () => {
		console.log("connecting...");
		try {
			const arcanaProvider = await auth.connect();
		} catch (error) {
			console.log({ error });
		}
	};

	useEffect(() => {
		if (auth.user) {
			console.log(auth);
			setCurrentAccount(auth.user.address);
		}
	}, [auth]);

	const checkIfWalletConnected = async () => {
		try {
			if (!window.ethereum) return console.log("Install Metamask");
			const accounts = await window.ethereum.request({
				method: "eth_accounts",
			});
			if (accounts.length) {
				setCurrentAccount(accounts[0]);
				console.log("Current Account", currentAccount);
			} else {
				console.log("No accounts found!");
			}
		} catch (error) {
			console.log("Someting wrong while connecting to wallet");
		}
	};

	return (
		<AuthContext.Provider
			value={{
				checkIfWalletConnected,
				connectUsingArcana,
				currentAccount,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
