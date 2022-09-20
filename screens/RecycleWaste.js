import { ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "../components/Themed";
import Web3 from "web3";
import * as WebBrowser from "expo-web-browser";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { ThemeContext } from "../context/ThemeProvider";

import { contractInfo } from "./contractAPIs";
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");


//NOTE: This is an admin function
export default function Storage() {
	const { styles } = useContext(ThemeContext);
	const connector = useWalletConnect();
	const [wasteValue, setWasteValue] = useState();
	const [wasteIDInput, setWasteIDInput] = useState();
	const [binIDInput, setBinIDInput] = useState();
	const [contractLink, setContractLink] = useState();
	const [recycling, setRecycling] = useState(false);
	const [gettingGarbage, setGettingGarbage] = useState(false);
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

	const RecycleWaste = async () => {
		setRecycling(true);
		try {
			let txData = await contract?.methods
				.recycle(binIDInput, wasteIDInput)
				.encodeABI();

			await connector.sendTransaction({
				from: currentUser,
				to: contractInfo.address,
				data: txData,
			});
		} catch (e) {
			console.log(e);
		} finally {
			setRecycling(false);
		}
	};

	const getListOfRecycledWaste = async () => {
		setGettingGarbage(true);
		try {
			const result = (await contract?.methods
				.garbage(2)
				.call()) ;
			setWasteValue(result);
		} catch (e) {
			console.log(e);
		} finally {
			setGettingGarbage(false);
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
				<Text>Supply waste data</Text>
				<TextInput
					value={wasteIDInput}
					onChangeText={(newValue) => setWasteIDInput(newValue)}
					style={styles.textInput}
				/>
				<TextInput
					value={binIDInput}
					onChangeText={(newValue) => setBinIDInput(newValue)}
					style={styles.textInput}
				/>
				{recycling ? (
					<ActivityIndicator color={"white"} />
				) : (
					<TouchableOpacity onPress={RecycleWaste}>
						<Text>Recycle waste</Text>
					</TouchableOpacity>
				)}
			</View>
			<View style={styles.separator}></View>
			{
					/*@Segun please note: 
						* After new wastes are generated, the list of generated waste can be pulled 
						NOTE
						----
						o The return value of the generated waste is a 'list' which contain several wastesData.
            o Each of the waste in this list is of type JSON and has an ID which is the index of such wasteData. i.e its position
            o Each waste has these information:

                o value - bytes32 i.e the waste data - string
                o collector - address of collector;
                o generator - address of generator;
                o recycler - address of recycler
                o state - The status of such waste e.g generated or recylced or collected;
				*/
				}
			<View style={styles.innerContainer}>
				<Text>Recycle Wastes</Text>
				{wasteValue ? (
					<Text style={{ marginVertical: 10 }}>
						Recyled waste: {wasteValue}
					</Text>
				) : null}
				{gettingGarbage ? (
					<ActivityIndicator color={"white"} />
				) : (
					<TouchableOpacity onPress={getListOfRecycledWaste}>
						<Text>See list of recycled waste</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}
