import React from "react";
import { View, Text, StyleSheet } from "react-native";
const VendorDashBoard = (props) => {
  return (
    <View style={styles.screen}>
      <Text>YOUR MEAL OFFERINGS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VendorDashBoard;
