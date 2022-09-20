import * as React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/onboardingScreens/Onboarding";
import Login from "../screens/Login/Login";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import SignUpScreen from "../screens/SignUp/SignUpScreen";
import ResetPassword from "../screens/ResetPassword/ResetPassword";
import IncorrectPhrase from "../screens/ResetPassword/IncorrectPhrase";
import ApplyForSmartBinScreen from "../screens/Apply/ApplyForSmartBinScreen";
import ApplicationForm from "../screens/Apply/ApplicationForm";
import CongratulationsScreen from "../screens/Apply/CongratulationsScreen";
import HomePage from "./HomePage";

const Stack = createNativeStackNavigator();

const AppNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="IncorrectPhrase" component={IncorrectPhrase} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="ApplyForDAO" component={ApplicationForm} />
      <Stack.Screen
        name="ApplyForSmartWasteBin"
        component={ApplyForSmartBinScreen}
      />
      <Stack.Screen name="Congrats" component={CongratulationsScreen} />
    </Stack.Navigator>
    // <ApplyForSmartBinScreen />
    // <ApplicationForm />
    // <CongratulationsScreen />
  );
};

export default AppNav;
