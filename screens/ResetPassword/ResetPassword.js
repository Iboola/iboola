import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "../../components/Header";
import { Entypo } from "@expo/vector-icons";
import { COLORS, FONTS, assets } from "../../constant";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

const ResetPassword = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: "5%",
        alignItems: "center",
      }}
    >
      <View style={{ width: "100%" }}>
        <Header title="Create Account" />
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: "5%",
          paddingVertical: "5%",
        }}
      >
        <Text
          style={{
            fontWeight: "300",
            fontSize: 34,
            lineHeight: 42,
            fontFamily: FONTS.light,
          }}
        >
          Create new account
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          paddingHorizontal: "5%",
          paddingVertical: "5%",
        }}
      >
        <Text style={{ flexShrink: 1 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: COLORS.btnColor }}>Already have a wallet?</Text>
        </TouchableOpacity>
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
          Password
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="********"
            style={{
              borderBottomWidth: 1,
              borderColor: COLORS.gray,
              flex: 1,
            }}
          />
          <Entypo name="eye-with-line" size={30} color="black" />
        </View>
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
          Confirm Password
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
          <Entypo name="eye-with-line" size={30} color="black" />
        </View>
      </View>

      <Button action="RESET PASSWORD" />
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
