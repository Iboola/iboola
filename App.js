import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import { useFonts } from "expo-font";
import Onboarding from "./screens/onboardingScreens/Onboarding";
import Login from "./screens/Login/Login";
import { NavigationContainer } from "@react-navigation/native";
import AppNav from "./nav/AppNav";
import HomePage from "./nav/HomePage";
import MyTabs from "./nav/TopTabNav";
import ApplicationForm from "./screens/Apply/ApplicationForm";

export default function App() {
  const [loaded] = useFonts({
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  if (!loaded) return null;
  return (
    <NavigationContainer>
      <AppNav />
      {/* <HomePage />
      <MyTabs /> */}
      {/* <ApplicationForm /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
