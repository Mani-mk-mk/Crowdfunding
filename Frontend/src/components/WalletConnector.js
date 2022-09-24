import { InjectedConnector } from "@web3-react/injected-connector";

//1: Mainnet, 4: Rinkeby, 1337: Local network (Ganache)
const injected = new InjectedConnector({
	supportedChainIds: [1, 4, 1337],
});

export default injected;
