import React from "react";
import { View, Text, StyleSheet } from "react-native";
const UpdateMeal = (props) => {
  return (
    <View style={styles.screen}>
      <Text>UPDATE MEALS</Text>
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

export default UpdateMeal;
