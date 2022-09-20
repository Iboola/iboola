import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React from "react";
import Login from "../Login/Login";
import Button from "../../components/Button";
import AppIntroSlider from "react-native-app-intro-slider";
import { assets, FONTS } from "../../constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const Onboarding = () => {
  const [showRealApp, setShowRealApp] = React.useState(false);
  const navigation = useNavigation();

  const onDone = () => {
    setShowRealApp(true);
  };

  const onSkip = () => {
    setShowRealApp(true);
  };

  const renderItem = ({ item }) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: item.backgroundColor,
            alignItems: "center",
            justifyContent: "space-around",
            paddingBottom: hp("15%"),
            flex: 1,
          }}
        >
          <Image
            source={item.heading}
            style={{
              height: hp("10%"),
              width: wp("20%"),
              resizeMode: "contain",
            }}
          />
          <Image
            source={item.image}
            style={{
              height: hp("50%"),
              width: wp("50%"),
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              height: hp("10%"),
              fontWeight: "700",
              fontFamily: FONTS.bold,
              fontSize: 28,
              lineHeight: 32,
            }}
          >
            {item.title}
          </Text>
          <View
            style={{
              flexShrink: 1,
              paddingHorizontal: 10,
              height: 120,
              width: "100%",
            }}
          >
            <Text
              style={{
                // height: hp("5%"),
                textAlign: "center",
                fontWeight: "400",
                fontFamily: FONTS.regular,
                fontSize: 16,
                lineHeight: 24,
              }}
            >
              {item.text}
            </Text>
          </View>
          <Button
            action="GET STARTED"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </SafeAreaView>
    );
  };
  const slides = [
    {
      key: 1,
      heading: assets.title,
      title: "Welcome",
      text: "It’s a pleasure to meet you. We are excited that you’re here so let’s get started!",
      image: assets.slider1,
      backgroundColor: "##F5F5F5",
    },
    {
      key: 2,
      heading: assets.title,
      title: "Smart Waste Bin",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet est non dolor condimentum rutrum eget vitae nunc. Nam ut ultricies sem",
      image: assets.slider2,
      backgroundColor: "##F5F5F5",
    },
    {
      key: 3,
      heading: assets.title,
      title: "Waste Generators",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet est non dolor condimentum rutrum eget vitae nunc. Nam ut ultricies sem.",
      image: assets.slider3,
      backgroundColor: "##F5F5F5",
    },
    {
      key: 4,
      heading: assets.title,
      title: "Waste Collectors",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet est non dolor condimentum rutrum eget vitae nunc. Nam ut ultricies sem.",
      image: assets.slider4,
      backgroundColor: "##F5F5F5",
    },
    {
      key: 5,
      heading: assets.title,
      title: "Waste Recyclers",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet est...",
      image: assets.slider5,
      backgroundColor: "##F5F5F5",
    },
  ];

  return (
    <>
      {showRealApp ? (
        <Login />
      ) : (
        <AppIntroSlider
          renderItem={renderItem}
          data={slides}
          onDone={onDone}
          onSkip={onSkip}
          dotStyle={{ backgroundColor: "grey", width: 50 }}
          dotClickEnabled={true}
          activeDotStyle={{ backgroundColor: "green", width: 70 }}
          // showSkipButton={true}
          // bottomButton
        />
      )}
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {},
  title: {},
  image: {},
  text: {},
});
