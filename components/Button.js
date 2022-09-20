import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constant";

const Button = ({ action, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: "90%",
        height: "5%",
        backgroundColor: COLORS.btnColor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontWeight: "700",
          color: COLORS.btnTextColor,
          fontFamily: FONTS.bold,
          fontSize: 14,
          lineHeight: 24,
        }}
      >
        {action}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
