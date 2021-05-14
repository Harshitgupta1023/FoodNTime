import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import SoldOut from "../assets/soldout.png";
const SoldOutImage = (props) => {
  return (
    <Image
      source={SoldOut}
      style={{
        width: "30%",
        height: "45%",
        backgroundColor: "rgba(0,0,0,0.1)",
        position: "absolute",
        bottom: 60,
        left: 130,
      }}
    ></Image>
  );
};

const styles = StyleSheet.create({});

export default SoldOutImage;
