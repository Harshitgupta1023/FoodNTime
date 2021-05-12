import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";

import { ListItem, Icon, Avatar, Button } from "react-native-elements";
import { showMessage } from "react-native-flash-message";

import Veg from "../assets/veg.png";
import NonVeg from "../assets/nonVeg.png";

import DiscountImage from "../components/DiscountImage";
import VegImage from "../components/VegImage";

import Firebase from "../config/Firebase";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const addToCart = async (mealId) => {
  try {
    const amount = 1;
    var user = Firebase.auth().currentUser.uid;
    var db = await Firebase.firestore().collection("users").doc(user).get();
    var userData = db.data();
    var { cart, orders } = userData;
    if (cart.length === 0) {
      var meal = { mealID: mealId, quantity: amount };
      amount === 0 ? null : cart.push(meal);
    } else {
      const result = cart.find(({ mealID }) => mealID === mealId);
      if (result) {
        cart.map((meal) => {
          meal.mealID === result.mealID
            ? (meal.quantity = meal.quantity + amount)
            : (meal.quantity = meal.quantity);
        });
      } else {
        cart.push({ mealID: mealId, quantity: amount });
      }
    }
    await Firebase.firestore().collection("users").doc(user).update({ cart });
    showMessage({
      message: "Added to Cart",
      description: "Proceed to Cart to Checkout",
      type: "success",
    });
  } catch (err) {
    showMessage({
      message: "Failed. Please retry",
      description: err.message,
      type: "danger",
    });
  }
};
const MealDetails = (props) => {
  const { mealId, meals } = props.route.params;
  const { name, discount, price, imageURL, time, nonVeg, starter, dessert } =
    meals;
  const courseType = dessert ? "Dessert" : starter ? "Starter" : "Main Course";
  const list = [
    {
      name: "Price",
      realText: `  ₹ ${price}`,
      icon: "cash-outline",
      type: "ionicon",
    },
    {
      name: "Time",
      realText: `${time} min`,
      icon: "hourglass-outline",
      type: "ionicon",
    },
    {
      name: "Course Type",
      realText: courseType,
      icon: "restaurant-outline",
      type: "ionicon",
    },
    {
      name: "",
      realText: nonVeg ? "Non-Veg" : "VEG",
      avatar: nonVeg ? NonVeg : Veg,
    },
  ];
  useEffect(() => {
    props.navigation.setOptions({ title: name });
  });
  return (
    <View>
      <ImageBackground style={styles.mainImage} source={{ uri: imageURL }}>
        {discount === 0 ? null : <DiscountImage discount={discount} />}
        <VegImage nonVeg={nonVeg} width={screenWidth} height={screenHeight} />
      </ImageBackground>
      <View style={{ marginTop: 10, marginLeft: 10, width: "95%" }}>
        {list.map((l, i) => (
          <ListItem key={i} bottomDivider>
            {l.icon ? (
              <Icon name={l.icon} type={l.type ? l.type : null} />
            ) : null}

            {l.avatar ? <Avatar source={l.avatar} /> : null}

            <ListItem.Content>
              {l.name === "" ? null : (
                <ListItem.Subtitle>{l.name}</ListItem.Subtitle>
              )}
              <ListItem.Title>{l.realText}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <View
        style={{
          marginTop: 15,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          icon={<Icon name="shopping-cart" color="white" />}
          title="   Add to cart"
          titleStyle={{ fontFamily: "roboto-regular", fontSize: 18 }}
          onPress={() => {
            addToCart(mealId);
          }}
          raised
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainImage: {
    width: screenWidth,
    height: screenHeight / 5,
  },
});

export default MealDetails;
