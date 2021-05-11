import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import DefaultText from "../components/DefaultText";
const MealDetails = (props) => {
  const { mealId, meals } = props.route.params;
  const { name, discount, price, imageURL, time } = meals;
  useEffect(() => {
    props.navigation.setOptions({ title: name });
  });
  return (
    <View>
      <View style={styles.ImageContainer}>
        <Image style={styles.mainImage} source={{ uri: imageURL }} />
      </View>
      <DefaultText>Discount: {discount}%</DefaultText>
      <DefaultText>Price: Rs{price}</DefaultText>
      <DefaultText>Time: {time}min</DefaultText>
      <View
        style={{
          marginTop: 5,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          title="Add to cart"
          onPress={() => {
            props.navigation.navigate("Cart", { mealId: mealId });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  mainImage: {
    width: "95%",
    height: 150,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    zIndex: 8,
  },
});

export default MealDetails;
