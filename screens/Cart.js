import React from "react";
import { View, Text, StyleSheet } from "react-native";
const Cart = (props) => {
  const { mealId } = props.route.params === undefined ? "" : props.route.params;
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
