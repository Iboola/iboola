import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Header from "../../components/Header";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS, assets } from "../../constant";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{ paddingHorizontal: "5%", alignItems: "center", flex: 1 }}
    >
      <View style={{ width: "100%" }}>
        <Header title="Forgot  Password" />
      </View>
      <View
        style={{ width: "100%", paddingHorizontal: "5%", paddingVertical: 20 }}
      >
        <Text
          style={{
            fontWeight: "300",
            fontSize: 34,
            lineHeight: 42,
            fontFamily: FONTS.light,
          }}
        >
          Forgot password
        </Text>
      </View>
      <View
        style={{ width: "100%", paddingHorizontal: "5%", paddingVertical: 20 }}
      >
        <Text style={{ fontWeight: "400", fontSize: 16, lineHeight: 24 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
          SEED PHRASE
        </Text>
        <View style={{ flexDirection: "row", paddingVertical: "3%" }}>
          <TextInput
            placeholder="Rabbit Arrow Moise"
            style={{
              borderBottomWidth: 1,
              borderColor: COLORS.gray,
              flex: 1,
            }}
          />
        </View>
      </View>

      <Button
        action="RESET PASSWORD"
        onPress={() => navigation.navigate("IncorrectPhrase")}
      />
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
