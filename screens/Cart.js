import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import AppLoading from "expo-app-loading";
import Firebase from "../config/Firebase";

import CartTile from "../components/CartTile";
import { ScrollView } from "react-native";
const Cart = (props) => {
  const [userId, setUserId] = useState();
  const [cartItem, setCart] = useState();
  const [falseCartItem, setFalseCart] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [orderMeal, setOrderMeal] = useState();
  const [isItems, setIsItems] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, [isDelete]);
  const fetchCartItems = async () => {
    var user = Firebase.auth().currentUser.uid;
    setUserId(user);
    var storage = Firebase.storage().ref();
    var db = await Firebase.firestore().collection("users").doc(user).get();
    var userData = db.data();
    const { cart, orders } = userData;
    var allMeal = [];
    await Promise.all(
      cart.map(async (meal) => {
        try {
          var meals = await Firebase.firestore()
            .collection("meals")
            .doc(meal.mealID)
            .get();
          var meal = meals.data();
          var newURL = await storage.child(meal.imageURL).getDownloadURL();
          meal.imageURL = newURL;
          allMeal.push(meal);
        } catch (err) {}
      })
    );
    setCart(cart);
    setOrderMeal(allMeal);
    setFalseCart(cart);
  };

  const deleteCartItem = async (mealId) => {
    var db = Firebase.firestore().collection("users").doc(userId);
    var obj = falseCartItem.filter((meal) => meal.mealID !== mealId);
    try {
      await db.update({
        cart: obj,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (mealID) => {
    deleteCartItem(mealID);
    setIsDelete(!isDelete);
  };

  const handleIncrement = (mealId) => {
    var obj = [];
    falseCartItem.map((meal) =>
      meal.mealID === mealId
        ? obj.push({ mealID: meal.mealID, quantity: meal.quantity + 1 })
        : obj.push(meal)
    );
    setFalseCart(obj);
  };

  const handledecrement = (mealId) => {
    var obj = [];
    falseCartItem.map((meal) =>
      meal.mealID === mealId
        ? obj.push({
            mealID: meal.mealID,
            quantity: meal.quantity <= 1 ? 1 : meal.quantity - 1,
          })
        : obj.push(meal)
    );
    setFalseCart(obj);
  };

  const finalCheckout = async () => {
    var db = Firebase.firestore().collection("users").doc(userId);
    try {
      await db.update({
        cart: falseCartItem,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (!isItems) {
    return (
      <AppLoading
        startAsync={fetchCartItems}
        onFinish={() => {
          setIsItems(true);
        }}
        onError={console.warn}
      />
    );
  }

  var totalPrice = 0;
  orderMeal.map((dat, idx) => {
    totalPrice = totalPrice + falseCartItem[idx].quantity * dat.price;
  });

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>CART </Text>
      <View style={{ height: 500 }}>
        <ScrollView>
          {orderMeal.map((me, idx) => {
            return (
              <CartTile
                key={idx}
                imageURL={me.imageURL}
                name={me.name}
                price={me.price}
                quantity={falseCartItem[idx].quantity}
                time={me.time}
                onDel={() => {
                  handleDelete(cartItem[idx].mealID);
                }}
                onIncrease={() => handleIncrement(cartItem[idx].mealID)}
                onDecrease={() => handledecrement(cartItem[idx].mealID)}
              />
            );
          })}
        </ScrollView>
      </View>
      <Text
        style={{ ...styles.title, textAlign: "left", fontSize: 20, margin: 10 }}
      >
        Total : {totalPrice}
      </Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Button title="Proceed To Checkout" onPress={() => finalCheckout()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    fontFamily: "roboto-regular",
    fontWeight: "bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
});

export default Cart;
