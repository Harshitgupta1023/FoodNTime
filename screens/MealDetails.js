import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
const MealDetails = (props) => {
  const { meals } = props.route.params;
  const { name, discount, price, imageURL, time } = meals;

  return (
    <View style={styles.screen}>
      <Text>{name}</Text>
      <Text>{discount}</Text>
      <Text>{price}</Text>
      <Text>{time}</Text>
      <Image style={{ width: 150, height: 150 }} source={{ uri: imageURL }} />
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

export default MealDetails;
