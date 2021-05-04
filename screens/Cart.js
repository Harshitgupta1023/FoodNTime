import React from "react";
import { View, Text, StyleSheet } from "react-native";
const Cart = (props) => {
  return (
    <View style={styles.screen}>
      <Text>CART</Text>
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

export default Cart;
