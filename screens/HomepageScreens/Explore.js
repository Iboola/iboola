import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TabView, SceneMap } from "react-native-tab-view";
import { COLORS, FONTS } from "../../constant";
import BodyTab from "../../components/BodyTab";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Explore = () => {
  const [activeTab, setActiveTab] = React.useState(false);
  const [firstTab, setFirstTab] = React.useState(true);
  const [secondTab, setSecondTab] = React.useState(false);
  const switchTab = () => {
    setActiveTab(!activeTab);
  };
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={{ backgroundColor: "#EFFFEB", flex: 1 }}>
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", backgroundColor: "#EFFFEB" }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: "3%",
            paddingHorizontal: "5%",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Octicons name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <Text>Token Details</Text>
          <MaterialCommunityIcons
            name="microsoft-xbox-controller-menu"
            size={24}
            color="black"
          />
        </View>
        <Image source={require("../../assets/images/title.png")} />
        <View style={{ paddingVertical: "5%" }}>
          <Text style={{ fontFamily: FONTS.semiBold, paddingVertical: "2%" }}>
            IBoola Agric. Waste token
          </Text>
          <Text>
            N532.08 {"   "}
            <Text style={{ color: COLORS.btnColor }}>+2.14%</Text>
          </Text>
        </View>
        <View style={{ paddingVertical: "5%" }}>
          <Text style={{ fontFamily: FONTS.semiBold, fontSize: 18 }}>
            1.00965 {"   "}IBOOLA
          </Text>
          <Text style={{ fontFamily: FONTS.light }}>
            Portfolio Worth N27, 465.86
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
            paddingVertical: "3%",
          }}
        >
          <Text>BEP 20</Text>
          <View>
            <Text>01fghd66ry7ye5e467y8o678 </Text>
            <Text>6t20aytfytfyhjhjvh</Text>
          </View>
        </View>
        <View style={{ width: "20%", height: 60 }}>
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#123524",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              position: "absolute",
              left: "90%",
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 20,
                fontFamily: FONTS.bold,
              }}
            >
              Copy
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", paddingHorizontal: "10%" }}>
          <Text>Decimal: 0</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-around",
            paddingHorizontal: "20%",
            paddingVertical: "3%",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image source={require("../../assets/images/buy-crypto.png")} />
            <Text>Buy</Text>
          </View>
          <View>
            <Image source={require("../../assets/images/direct-up.png")} />
            <Text>Send</Text>
          </View>
          <View>
            <Image source={require("../../assets/images/direct-down.png")} />
            <Text>Receive</Text>
          </View>
          <View>
            <Image source={require("../../assets/images/card-coin.png")} />
            <Text>Swap</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={{ paddingVertical: "3%" }}>
            <TouchableOpacity>
              <Text style={{ fontFamily: FONTS.light, fontSize: 16 }}>
                Transaction History
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={{ fontFamily: FONTS.light, fontSize: 16 }}>
                Performance
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: 150,
              height: 50,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              borderRadius: 15,
            }}
          >
            <AntDesign name="plus" size={24} color="black" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                fontFamily: FONTS.bold,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Explore;

const styles = StyleSheet.create({});
