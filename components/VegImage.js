import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Veg from "../assets/veg.png";
import NonVeg from "../assets/nonVeg.png";
const VegImage = ({ nonVeg, width, height }) => {
  return (
    <View
      style={{
        marginTop: height / 5 - height / 26,
        marginLeft: width - width / 12,
      }}
    >
      <Image style={{ width: 25, height: 25 }} source={nonVeg ? NonVeg : Veg} />
    </View>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     marginTop: 0,
  //   },
});

export default VegImage;
