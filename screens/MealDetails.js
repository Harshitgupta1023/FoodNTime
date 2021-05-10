import React, { useEffect } from "react";
import { Button } from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";
const MealDetails = (props) => {
  const { mealId, meals } = props.route.params;
  const { name, discount, price, imageURL, time } = meals;
  useEffect(() => {
    props.navigation.setOptions({ title: name });
  });
  return (
    <View style={styles.screen}>
      <Image style={{ width: 150, height: 150 }} source={{ uri: imageURL }} />
      <Text>{discount}</Text>
      <Text>{price}</Text>
      <Text>{time}</Text>
      <Button
        title="Add to cart"
        onPress={() => {
          props.navigation.navigate("cart", { mealId: mealId });
        }}
      />
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
