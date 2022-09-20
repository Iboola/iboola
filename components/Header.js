import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constant";
import { useNavigation } from "@react-navigation/native";
const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 20,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          position: "absolute",
          left: "50%",
          fontSize: 24,
          fontWeight: "900",
          lineHeight: 24,
          fontSize: 16,
          fontFamily: FONTS.extraBold,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
