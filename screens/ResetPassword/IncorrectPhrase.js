import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { COLORS, FONTS, assets } from "../../constant";
import { useNavigation } from "@react-navigation/native";

const IncorrectPhrase = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <View style={{ width: "100%" }}>
        <Header title="Forgot Password" />
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
            fontSize: 24,
            lineHeight: 42,
            fontWeight: "500",
            fontFamily: FONTS.regular,
          }}
        >
          Incorrect Recovery Phrase
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: "5%",
          paddingVertical: "2%",
          paddingBottom: "5%",
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: FONTS.regular,
            paddingBottom: "1%",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Text style={{ color: COLORS.btnColor }}>Having Problems?</Text>
      </View>

      <Button
        action="RESET PASSWORD"
        onPress={() => navigation.navigate("ResetPassword")}
      />
    </SafeAreaView>
  );
};

export default IncorrectPhrase;

const styles = StyleSheet.create({});
