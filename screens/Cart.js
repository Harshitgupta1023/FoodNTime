import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Dimensions } from "react-native";

import AppLoading from "expo-app-loading";
import Firebase from "../config/Firebase";

import CartTile from "../components/CartTile";
import { ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";

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
    console.log(Firebase.auth().currentUser);
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
    showMessage({
      message: "Item Deleted",
      // description: "",
      type: "success",
    });
  };

  const handleDelete = (mealID) => {
    deleteCartItem(mealID);
    setIsDelete(!isDelete);
  };

  const handleIncrement = async (mealId) => {
    var obj = [];
    falseCartItem.map((meal) =>
      meal.mealID === mealId
        ? obj.push({ mealID: meal.mealID, quantity: meal.quantity + 1 })
        : obj.push(meal)
    );
    setFalseCart(obj);
    var db = Firebase.firestore().collection("users").doc(userId);
    db.update({
      cart: obj,
    });
  };

  const handledecrement = (mealId) => {
    var obj = [];
    falseCartItem.map((meal) => {
      meal.mealID === mealId
        ? meal.quantity <= 1
          ? showMessage({
              message: "Minimum Required Amount",
              description: "If You want to Delete, Click DELETE",
              type: "success",
            })
          : meal.quantity
        : null;
      meal.mealID === mealId
        ? obj.push({
            mealID: meal.mealID,
            quantity: meal.quantity <= 1 ? 1 : meal.quantity - 1,
          })
        : obj.push(meal);
    });
    setFalseCart(obj);
    var db = Firebase.firestore().collection("users").doc(userId);
    db.update({
      cart: obj,
    });
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
  } else {
    var totalPrice = 0;
    orderMeal.map((dat, idx) => {
      totalPrice = totalPrice + falseCartItem[idx].quantity * dat.price;
    });
    if (cartItem.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.title}>CART IS EMPTY !!!</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.screen}>
          <Text style={styles.title}>CART </Text>
          <View
            style={{
              height: (3 * Dimensions.get("window").height) / 5,
            }}
          >
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "20%",
              borderRadius: 5,
              elevation: 2,
              marginVertical: 10,
              marginHorizontal: 5,
            }}
          >
            <Text
              style={{
                ...styles.title,
                textAlign: "left",
                fontFamily: "roboto-light",
                fontSize: 25,
              }}
            >
              Total :
              <Text
                style={{
                  fontFamily: "roboto-regular",
                  fontSize: 25,
                }}
              >
                {" "}
                ₹ {totalPrice}
              </Text>
            </Text>

            <Button
              title="Proceed To Checkout"
              onPress={() => finalCheckout()}
            />
          </View>
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    flex: 1,
  },
  title: {
    fontFamily: "roboto-regular",
    fontSize: 22,
    margin: 15,
    textAlign: "center",
  },
});

export default Cart;
