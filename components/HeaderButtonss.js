import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Platform } from "react-native";
import Colors from "../constants/colors";
const HeaderButtonss = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={26}
      color={Platform.OS === "android" ? Colors.primaryColor : "white"}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HeaderButtonss;
