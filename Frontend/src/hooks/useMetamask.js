import React, {
	createContext,
	useEffect,
	useMemo,
	useCallback,
	useState,
	useContext,
} from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/WalletConnector";

export const MetamaskContext = createContext(null);

export const MetamaskProvider = ({ children }) => {
	const { activate, account, library, connector, active, error, deactivate } =
		useWeb3React();

	// Check when App is Connected or Disconnected to MetaMask
	// Connect to MetaMask wallet
	const connect = async () => {
		console.log("Connecting to MetaMask...");
		try {
			await activate(injected);
		} catch (error) {
			console.log("Error on connecting: ", error);
		}
	};

	// Disconnect from Metamask wallet
	const disconnect = async () => {
		console.log("Disconnecting wallet from App...");
		try {
			await deactivate();
		} catch (error) {
			console.log("Error on disconnnect: ", error);
		}
	};

	const values = useMemo(
		() => ({
			account,
			connect,
			disconnect,
		}),
		[account]
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
