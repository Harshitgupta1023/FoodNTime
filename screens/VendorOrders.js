import React from "react";
import { View, Text, StyleSheet } from "react-native";
const VendorOrders = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Past Orders</Text>
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

export default VendorOrders;
