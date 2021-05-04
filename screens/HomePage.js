import React from "react";
import { View, Text, StyleSheet } from "react-native";
const HomePage = (props) => {
  return (
    <View style={styles.screen}>
      <Text>MEALSS</Text>
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

export default HomePage;
