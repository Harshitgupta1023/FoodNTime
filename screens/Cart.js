import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Firebase from "../config/Firebase";

const Cart = (props) => {
  const [cart, setCart] = useState();
  const [orderMeal, setOrderMeal] = useState({});

  const fetchCartItems = async () => {
    var user = Firebase.auth().currentUser.uid;
    var db = await Firebase.firestore().collection("users").doc(user).get();
    var userData = db.data();
    const { cart, orders } = userData;
    var allMeal = [];
    cart.map(async (meal) => {
      var meals = await Firebase.firestore()
        .collection("meals")
        .doc(meal.mealID)
        .get();
      allMeal.push(meals.data());
    });
    setCart(cart);
    setOrderMeal(allMeal);
  };
  useEffect(() => {
    fetchCartItems();
  }, []);
  console.log("hey", cart);
  return (
    <View style={styles.screen}>
      <Text>CART {orderMeal.length} </Text>
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
