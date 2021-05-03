import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function Orders() {
  return (
    <View style={styles.screen}>
      <Text>Orders</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
