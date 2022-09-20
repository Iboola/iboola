import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Button from "../../components/Button";
import { COLORS, FONTS, SIZES } from "../../constant";

const Staking = () => {
  const [word, setWord] = React.useState(
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis "
  );
  const [text, setText] = React.useState(word.slice(0, 100));
  const [readMore, setReadMore] = React.useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginBottom: 200,
            marginTop: 50,
          }}
        >
          <Image
            source={require("../../assets/images/screen3.png")}
            style={{ width: "100%", height: "40%", resizeMode: "cover" }}
          />
          <View
            style={{
              paddingVertical: "2%",
              width: "100%",
              paddingHorizontal: "5%",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 20,
                fontFamily: FONTS.semiBold,
              }}
            >
              Agric. & Market Waste
            </Text>
          </View>
          <View
            style={{
              paddingVertical: "2%",
              width: "100%",
              paddingHorizontal: "5%",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 12,
                fontFamily: FONTS.light,
              }}
            >
              It's the season of Harvest
            </Text>
          </View>
          <View
            style={{
              paddingVertical: "2%",
              width: "100%",
              paddingHorizontal: "5%",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 14,
                fontFamily: FONTS.light,
              }}
            >
              {text}
              {!readMore && "..."}
              <Text
                style={{
                  fontSize: SIZES.small,
                  fontFamily: FONTS.semiBold,
                  color: COLORS.primary,
                }}
                onPress={() => {
                  if (!readMore) {
                    setText(word);
                    setReadMore(true);
                  } else {
                    setText(word.slice(0, 120));
                    setReadMore(false);
                  }
                }}
              >
                {readMore ? "Show Less " : "Read More"}
              </Text>
            </Text>
          </View>
          <View
            style={{
              paddingVertical: "2%",
              width: "100%",
              paddingHorizontal: "5%",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 20,
                fontFamily: FONTS.semiBold,
              }}
            >
              Read Activities
            </Text>
          </View>
          <View style={{ width: "100%", paddingVertical: "5%" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                backgroundColor: "lightgray",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                paddingHorizontal: 15,
                paddingVertical: 15,
                marginHorizontal: "5%",
              }}
            >
              <Text>Activity</Text>
              <Text>On Date</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                backgroundColor: "white",
                paddingHorizontal: 15,
                paddingVertical: 15,
                marginHorizontal: "5%",
                borderRightWidth: 1,
                borderLeftWidth: 1,
                borderBottomWidth: 1,
                borderColor: "lightgray",
              }}
            >
              <Text>Waste Collection</Text>
              <Text>01/09/2022</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                backgroundColor: "white",
                paddingHorizontal: 15,
                paddingVertical: 15,
                marginHorizontal: "5%",
                borderRightWidth: 1,
                borderLeftWidth: 1,
                borderBottomWidth: 1,
                borderColor: "lightgray",
              }}
            >
              <Text>Waste Collection</Text>
              <Text>27/08/2022</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                backgroundColor: "white",
                paddingHorizontal: 15,
                paddingVertical: 15,
                marginHorizontal: "5%",
                borderRightWidth: 1,
                borderLeftWidth: 1,
                borderBottomWidth: 1,
                borderColor: "lightgray",
              }}
            >
              <Text>Waste Generation</Text>
              <Text>23/08/2022</Text>
            </View>
          </View>
          <Button action="Expand View" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Staking;

const styles = StyleSheet.create({});
