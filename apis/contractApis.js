import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Web3 from "web3";
import deployedContracts from "@celo-composer/hardhat/deployments/hardhat_contracts.json";
import Account from "../screens/Account";
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const contracts = deployedContracts["44787"]?.["alfajores"]?.contracts.IBoolaContractV;
const address = contracts.address;
const instance = contracts ? new web3.eth.Contract(contracts.abi, address) : null;

export const contractsInfo = {
	signUpAsWasteCollector: async( location, address, connector ) => {
		// _callback(true);
		try {
			let txData = await instance?.methods
				.signUpAsWasteCollector(location, address, connector)
				.encodeABI();
			await connector?.sendTransaction({
				from: connector?.currentUser,
				to: address,
				data: txData,
			});
		} catch (e) {
			console.log(e);
		} 
	},

	recycleWaste: async ( connector, binIDInput, wasteIDInput) => {
		try {
			let txData = await instance?.methods
				.recycle(binIDInput, wasteIDInput)
				.encodeABI();

			await connector?.sendTransaction({
				from: connector.currentUser,
				to: address,
				data: txData,
			});
		} catch (e) {
			console.log(e);
		} finally {
			_callback(false);
		}
	},
	
	registerSmartBin: async (connector) => {
		_callback(true);
		try {
			let txData = await instance?.methods
				.addNewBin()
				.encodeABI();

			await connector.sendTransaction({
				from: connector?.currentUser,
				to: address,
				data: txData,
			});
		} catch (e) {
			console.log(e);
		} finally {
			_callback(false);
		}
	},
	getProfile : async () => {
    let result;
    try {
    	result = await instance?.methods
				.profile(0, connector?.currentUser)
				.call();
      // setProfileInformation(result);
    } catch (e) {
      console.log(e);
    }
  },
	getRegisteredBins: async(_callback, setBins) => {
    _callback(true);
    try {
      const result = (await instance?.methods
					.bins()
					.call());
      setBins(result);
    } catch (e) {
      // console.log(e);
    } finally {
      _callback(false);
    }
  },
	generateWaste: async(wasteInput, connector) => {
		try {
			let txData = await instance?.methods
				.generateWaste(wasteInput)
				.encodeABI();
			await connector?.sendTransaction({
				from: connector?.currentUser,
				to: address,
				data: txData,
			});
		} catch (e) {
			console.log(e);
		} 
	},
	collectWaste: async(smartBinId, wasteId, connector) => {
		try {
			let txData = await instance?.methods
				.collectWaste(smartBinId, wasteId)
				.encodeABI();
			await connector?.sendTransaction({
				from: connector?.currentUser,
				to: address,
				data: txData,
			});
		} catch (e) {
			console.log(e);
		} 
	},
	recycle: async() =>{
		try {
			let txData = await instance?.methods
				.recycle(smartBinId, wasteId)
				.encodeABI();
			await connector?.sendTransaction({
				from: connector?.currentUser,
				to: address,
				data: txData,
			});
		} catch (e) {
			console.log(e);
		} 
	},
	/**
	 * @param addressToWhitelist - bytes32 , an ethereum address-like
	 * @param category - Integer less than 4. Category of user to whitelist. See below for 
	 * 									different categories of users and their integer
	 * 									representation:
	 * 										o COLLECTOR - 0
	 * 										o GENERATOR - 1
	 * 										o RECYCLER - 2
	 * 										o BInOWNER  - 3
	*/
	whitelistUser: async(addressToWhitelist, category) => {
		try {
			let txData = await instance?.methods
				.whitelistUser(smartBinId, wasteId)
				.encodeABI();
			await connector?.sendTransaction({
				from: connector?.currentUser,
				to: address,
				data: txData,
			});
		} catch (e) {
			console.log(e);
		} 
	},
	blacklistUser: async(addressToWhitelist, category, connector) => {
		try {
			let txData = await instance?.methods
				.blacklistUser(smartBinId, wasteId)
				.encodeABI();
			await connector?.sendTransaction({
				from: connector?.currentUser,
				to: address,
				data: txData,
			});
		} catch (e) {
			console.log(e);
		} 
	}

}
