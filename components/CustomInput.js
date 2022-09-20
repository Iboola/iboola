import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomInput = ({ heading, placeholder }) => {
  return (
    <View>
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
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
