import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { Input } from "react-native-elements";
import DefaultText from "../components/DefaultText";

import Firebase from "../config/Firebase";

const AddingMeals = async (mealId, amount) => {
  amount = parseInt(amount);
  amount < 0 ? (amount = 0) : amount;
  var user = Firebase.auth().currentUser.uid;
  var db = await Firebase.firestore().collection("users").doc(user).get();
  var userData = db.data();
  var { cart, orders } = userData;
  if (cart.length === 0) {
    var meal = { mealID: mealId, quantity: amount };
    amount === 0 ? null : cart.push(meal);
  } else {
    const result = cart.find(({ mealID }) => mealID === mealId);
    result === undefined
      ? amount === 0
        ? null
        : cart.push({ mealID: mealId, quantity: amount })
      : cart.map((meal) => {
          meal.mealID === result.mealID
            ? (meal.quantity = meal.quantity + amount)
            : (meal.quantity = meal.quantity);
        });
  }
  await Firebase.firestore().collection("users").doc(user).update({ cart });
};
const MealDetails = (props) => {
  const [quantity, setQuantity] = useState("0");
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
            AddingMeals(mealId, quantity);
          }}
        />
        <Input
          placeholder="Quantity"
          onChangeText={(val) => setQuantity(val)}
          label="How Much?"
          value={quantity}
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
