import React, {
	Children,
	createContext,
	useEffect,
	useMemo,
	useState,
	useContext,
} from "react";
import { useWeb3React } from "@web3-react/core";
import injected from "../components/WalletConnector";

export const MetamaskContext = createContext(null);

export const MetamaskProvider = ({ children }) => {
	const { activate, account, library, connector, active, deactivate } =
		useWeb3React();

	const connect = async () => {
		console.log("Connecting to MetaMask Wallet");
		try {
			await activate(injected);
		} catch (error) {
			console.log("Error on connecting: ", error);
		}
	};

	// Disconnect from Metamask wallet
	const disconnect = async () => {
		console.log("Deactivating...");
		try {
			await deactivate();
		} catch (error) {
			console.log("Error on disconnecting: ", error);
		}
	};

	const values = useMemo(
		() => ({
			account,
			connect,
			disconnect,
		}),
		[]
	);

	return (
		<MetamaskContext.Provider value={values}>
			{children}
		</MetamaskContext.Provider>
	);
};

const useMetamask = () => {
	const context = useContext(MetamaskContext);

	if (context === undefined) {
		throw new Error(
			"useMetaMask hook must be used with a MetaMaskProvider component"
		);
	}

	return context;
};

export default useMetamask;
