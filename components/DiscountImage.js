import React from "react";
import { ImageBackground, Text, StyleSheet } from "react-native";
import discount_tag from "../assets/discount_tag.jpg";

const DiscountImage = (props) => {
  return (
    <ImageBackground
      style={styles.discountimagecontainer}
      source={discount_tag}
    >
      <Text style={styles.discountimageText}>{props.discount}% OFF</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  discountimagecontainer: {
    width: 85,
    height: 60,
    position: "absolute",
    top: -10,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  discountimageText: {
    marginTop: 15,
    marginLeft: 40,
    color: "white",
    fontFamily: "roboto-light",
  },
});

export default DiscountImage;
