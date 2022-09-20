import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import MyTabs from "../../nav/TopTabNav";
import { FONTS } from "../../constant";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Wallet = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isActive, setIsActive] = React.useState(true);
  const [toggle, setToggle] = React.useState(false);
  const [toggleState, setToggleState] = React.useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D3602" }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingVertical: "10%",
            paddingHorizontal: "10%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Ionicons name="search" size={24} color="black" /> */}
            <TextInput
              style={{
                backgroundColor: "white",
                width: "70%",
                height: 40,
                color: "black",
                borderRadius: 15,
              }}
              placeholder=" Search"
            />
          </View>
          <View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={{ fontFamily: FONTS.light, color: "white" }}>
              Hide Balance
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: "5%" }}>
          <Text
            style={{ fontFamily: FONTS.semiBold, fontSize: 30, color: "white" }}
          >
            Wallet
          </Text>
        </View>
        <View
          style={{
            width: "90%",
            height: 150,
            backgroundColor: "#145A32",
            paddingHorizontal: "10%",
            justifyContent: "center",
            marginHorizontal: "5%",
            marginTop: "5%",
            borderRadius: 15,
          }}
        >
          <Text
            style={{ fontSize: 15, fontFamily: FONTS.regular, color: "white" }}
          >
            Current Balance
          </Text>
          <Text
            style={{ fontSize: 20, fontFamily: FONTS.bold, color: "white" }}
          >
            1.00965 {"   "}
            <Text>iBOOLA</Text>
          </Text>
          <Text
            style={{ fontSize: 20, fontFamily: FONTS.bold, color: "#07E607" }}
          >
            147% <Ionicons name="arrow-up" size={14} color="#07E607" />
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: "5%",
            }}
          >
            <TouchableOpacity
              style={{
                width: "30%",
                height: 30,
                backgroundColor: "#06BF06",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  color: "white",
                  fontSize: 10,
                }}
              >
                Load
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "30%",
                height: 30,
                backgroundColor: "#06BF06",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  color: "white",
                  fontSize: 10,
                }}
              >
                Exchange
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "30%",
                height: 30,
                backgroundColor: "#06BF06",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  color: "white",
                  fontSize: 10,
                }}
              >
                Withdraw
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: "5%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{
              borderColor: isActive ? "white" : null,
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                color: isActive ? "white" : "lightgray",
                fontSize: 16,
                fontFamily: FONTS.semiBold,
              }}
            >
              Your Activities
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: toggle ? "white" : null,
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                color: toggle ? "white" : "#858181",
                borderBottomWidth: 2,
                fontSize: 16,
                fontFamily: FONTS.semiBold,
              }}
            >
              Details
            </Text>
          </TouchableOpacity>
        </View>

        {isActive && (
          <>
            <View
              style={{
                width: "80%",
                height: 300,
                backgroundColor: "#e3dede",
                marginLeft: "10%",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 100,
              }}
            >
              <LinearGradient
                colors={["#0D3602", "#ffffff"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",

                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesome5
                    name="clipboard-list"
                    size={130}
                    color="white"
                    style={{ position: "absolute", top: 40 }}
                  />
                </View>
              </LinearGradient>

              <Text
                style={{
                  paddingVertical: "5%",
                  color: "#145A32",
                  fontFamily: FONTS.regular,
                  fontSize: 16,
                }}
              >
                You have no Activities yet
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
