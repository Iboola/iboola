import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "../../components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, FONTS, assets } from "../../constant";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const [uniqueId, setUniqueId] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <>
      <SafeAreaView
        style={{ paddingHorizontal: 20, alignItems: "center", paddingTop: 50 }}
      >
        <View style={{ width: "100%" }}>
          <Header title="Sign In" />
        </View>
        <Image
          source={assets.title}
          style={{
            height: hp("20%"),
            width: wp("20%"),
            resizeMode: "contain",
          }}
        />

        <View>
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: 16,
              lineHeight: 24,
              fontWeight: "400",
            }}
          >
            Welcome to iBOOLA, an Agricultural and Market Waste Management
            System.
          </Text>
        </View>
        <View
          style={{
            paddingVertical: "5%",
            width: "100%",
            paddingHorizontal: "5%",
          }}
        >
          <Text
            style={{
              fontWeight: "300",
              fontSize: 12,
              lineHeight: 20,
              fontFamily: FONTS.regular,
              paddingBottom: "1%",
            }}
          >
            UNIQUE ID
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="234513EF"
              style={{
                borderBottomWidth: 1,
                borderColor: COLORS.gray,
                flex: 1,
              }}
            />
            <AntDesign name="check" size={30} color="green" />
          </View>
        </View>

        <View
          style={{
            padding: "5%",
            width: "100%",
            paddingHorizontal: "5%",
          }}
        >
          <Text
            style={{
              fontWeight: "300",
              fontSize: 12,
              lineHeight: 20,
              fontFamily: FONTS.regular,
              paddingBottom: "1%",
            }}
          >
            PASSWORD
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="*********"
              style={{
                borderBottomWidth: 1,
                borderColor: COLORS.gray,
                flex: 1,
              }}
              secureTextEntry={true}
            />
            <Entypo name="eye-with-line" size={30} color="black" />
          </View>
        </View>
        <View style={{ alignItems: "center", paddingVertical: "5%" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={{
                fontWeight: "300",
                lineHeight: 20,
                fontSize: 12,
                fontFamily: FONTS.regular,
              }}
              j
            >
              Forget Password?
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          action="SIGN IN"
          onPress={() => {
            navigation.navigate("HomePage");
          }}
        />

        <View
          style={{
            alignItems: "center",
            paddingVertical: "5%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{
              paddingHorizontal: "5%",
              paddingVertical: "2%",
              fontWeight: "300",
              lineHeight: 20,
              fontSize: 12,
              fontFamily: FONTS.regular,
            }}
          >
            Don’t have Wallet?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                fontWeight: "300",
                lineHeight: 20,
                fontSize: 12,
                fontFamily: FONTS.regular,
                color: COLORS.btnColor,
              }}
            >
              Create new account.
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Login;
