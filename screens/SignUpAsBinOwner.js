import { ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "../components/Themed";
import Web3 from "web3";
import * as WebBrowser from "expo-web-browser";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { ThemeContext } from "../context/ThemeProvider";

import { contractInfo } from "./contractAPIs";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

export default function () {
	const { styles } = useContext(ThemeContext);
	const connector = useWalletConnect();
	const [bins, setBins] = useState();
	const [contractLink, setContractLink] = useState();
	const [signingUp, setSigningUp] = useState(false);
	const [gettingBins, setGettingBins] = useState(false);
	const currentUser = connector.accounts[0];
	const contract = contractInfo
		? new web3.eth.Contract(contractInfo.abi, contractInfo.address)
		: null;

	useEffect(() => {
		if (contractInfo) {
			setContractLink(
				`https://alfajores-blockscout.celo-testnet.org/address/${contractInfo.address}`
			);
		}
	}, [contractInfo]);

	const addNewBin = async () => {
		setSigningUp(true);
		try {
			let txData = await contract?.methods
				.addNewBin()
				.encodeABI();

			await connector.sendTransaction({
				from: currentUser,
				to: contractInfo.address,
				data: txData,
			});
		} catch (e) {
			console.log(e);
		} finally {
			// setSigningUp(false);
		}
	};

  const getRegisteredBins = async () => {
    setGettingBins(true);
    try {
      const result = (await contract?.methods
        .bins()
        .call());
      setBins(result);
    } catch (e) {
      console.log(e);
    } finally {
      setGettingBins(false);
    }
  };

	function handlePress() {
		WebBrowser.openBrowserAsync(contractLink);
	}

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.title}>Storage Contract</Text>
				<TouchableOpacity
					style={styles.externalLink}
					onPress={handlePress}>
					<Text style={styles.externalLink}>
						{`${contractInfo.address.substr(
							0,
							5
						)}...${contractInfo.address.substr(-5)}`}
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.separator}></View>
			<View style={styles.innerContainer}>
				{signingUp ? (
					<ActivityIndicator color={"white"} />
				) : (
					<TouchableOpacity onPress={addNewBin}>
						<Text>Register Waste Bin</Text>
					</TouchableOpacity>
				)}
			</View>
			<View style={styles.separator}></View>
			<View style={styles.innerContainer}>

				{
					/*@Segun please note: 
						* After Bin Owner adds a new bin, they can confirm registration 
						* by pulling the list of created bins.
						NOTE
						----
						o The return value of the bins is a 'list' which contain several bins.
            o Each of the bin in this list has an ID which is the index of such bin. i.e its position
            o Each bin is in JSON and list format.
              It contains these information:

                - A list of waste --> [wasteA, wasteB, ...rest];
                - A string of type bytes32 which is an address of the bin owner;
				*/
				}
				<Text>List of created bins</Text>
				{bins ? (
					<Text style={{ marginVertical: 10 }}>
						{/* Format the bin information properly */}
						Bins: {bins}
					</Text>
				) : null}
				{gettingBins ? (
					<ActivityIndicator color={"white"} />
				) : (
					<TouchableOpacity onPress={getRegisteredBins}>
						<Text>See list of created bins</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}
