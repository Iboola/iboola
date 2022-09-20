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
  const [profileInfo, setProfileInformation] = useState();
  const [contractLink, setContractLink] = useState();
  const [signingUp, setSigningUp] = useState(false);
  const [gettingProfile, setGettingProfile] = useState(false);
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

  const signUpAsWasteCollector = async () => {
    setSigningUp(true);
    try {
      let txData = await contract?.methods.signUpAsWasteCollector().encodeABI();

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

  const getProfile = async () => {
    setGettingProfile(true);
    try {
      const result = await contract?.methods.profile(0, currentUser).call();
      setProfileInformation(result);
    } catch (e) {
      console.log(e);
    } finally {
      setGettingProfile(false);
    }
  };

  function handlePress() {
    WebBrowser.openBrowserAsync(contractLink);
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Storage Contract</Text>
        <TouchableOpacity style={styles.externalLink} onPress={handlePress}>
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
          <TouchableOpacity onPress={signUpAsWasteCollector}>
            <Text>Sign Up As Waste Collector</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.separator}></View>
      <View style={styles.innerContainer}>
        {/*@Segun please note: 
						* After collector signed up, they can confirm registration 
						* by pulling the profile information 
						NOTE
						----
						When `Confirm registration` is called, the return value is a list tracked in
						"profileInfo"  which is a json format and a list. Same information in the list
						are contained in the JSON as well.
						
						Expected information in "profileInfo" 
						=====================================
						'This is the order they'll arrive in the list"

						  o transactionTime;
							o wasteCount;
							o approval;
							o isRegistered;

							So you can do: profileInfo?.transactionTime etc or profileInfo[0]

				*/}
        <Text>Confirm registration</Text>
        {profileInfo ? (
          <Text style={{ marginVertical: 10 }}>
            {/* Format the registration information properly */}
            Registration Info: {profileInfo}
          </Text>
        ) : null}
        {gettingProfile ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <TouchableOpacity onPress={getProfile}>
            <Text>See registration information</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
