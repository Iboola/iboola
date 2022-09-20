import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Wallet from "../screens/HomepageScreens/Wallet";
import Explore from "../screens/HomepageScreens/Explore";
import Staking from "../screens/HomepageScreens/Staking";
import DAO from "../screens/HomepageScreens/DAO";

const HomePage = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        barStyle: {
          height: 100,
          backgroundColor: "white",
        },
        headerShown: false,
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;

          if (route.name === "Explore") {
            iconName = focused ? "clipboard-check" : "clipboard-check-outline";
          } else if (route.name === "Wallet") {
            iconName = focused ? "wallet" : "wallet-outline";
          } else if (route.name === "Stalking") {
            iconName = focused ? "view-grid" : "view-grid-outline";
          } else if (route.name === "DAO") {
            iconName = focused ? "currency-btc" : "currency-btc";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={30} color="green" />
          );
        },
      })}
    >
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Stalking" component={Staking} />
      <Tab.Screen name="DAO" component={DAO} />
    </Tab.Navigator>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
