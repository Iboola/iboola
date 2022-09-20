import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, FONTS, assets } from "../../constant";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

const ApplyForSmartBinScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <View style={{ paddingTop: "30%", paddingBottom: "10%" }}>
        <Image source={assets.slider2} />
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            fontFamily: FONTS.semiBold,
          }}
        >
          Apply For Smart Waste Bin
        </Text>
      </View>
      <View
        style={{ alignItems: "center", width: "100%", paddingVertical: "5%" }}
      >
        <Text
          style={{
            textAlign: "center",
            paddingHorizontal: "10%",
            fontFamily: FONTS.regular,
            fontSize: 16,
          }}
        >
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis
        </Text>
      </View>
      <Button
        action="Apply Here"
        onPress={() => {
          navigation.navigate("ApplyForDAO");
        }}
      />
      <View style={{ paddingVertical: "5%" }}>
        <TouchableOpacity
          onPress={() => {
            return;
          }}
        >
          <Text style={{ color: COLORS.textColor }}>Not Now</Text>
        </TouchableOpacity>
      </View>
      <View style={{ position: "absolute", bottom: "10%" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              color: COLORS.btnColor,
              fontSize: 18,
              fontFamily: FONTS.light,
            }}
          >
            I already Own a iBOOLA Smart Waste Bin
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ApplyForSmartBinScreen;

const styles = StyleSheet.create({});
