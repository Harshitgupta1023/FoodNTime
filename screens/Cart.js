import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Modal,
} from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import axios from "axios";

import AppLoading from "expo-app-loading";
import Firebase from "../config/Firebase";
import firebase from "firebase";

import CartTile from "../components/CartTile";
import RazorpayCheckout from "react-native-razorpay";
import { ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";

const makeID = (length) => {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

const Cart = (props) => {
  const [userId, setUserId] = useState();
  const [cartItem, setCart] = useState();
  const [falseCartItem, setFalseCart] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [orderMeal, setOrderMeal] = useState();
  const [isItems, setIsItems] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [mealMap, setMealMap] = useState();

  var db = Firebase.firestore();

  useEffect(() => {
    fetchCartItems();
  }, [isDelete]);

  const fetchCartItems = async () => {
    var user = Firebase.auth().currentUser.uid;
    setUserId(user);
    var storage = Firebase.storage().ref();
    var user = await db.collection("users").doc(user).get();
    var userData = user.data();
    const { cart, orders } = userData;
    var allMeal = [];
    // console.log(cart);
    var map = {};
    await Promise.all(
      cart.map(async (meal) => {
        try {
          var meals = await db.collection("meals").doc(meal.mealID).get();
          var mealData = meals.data();
          var newURL = await storage.child(mealData.imageURL).getDownloadURL();
          mealData.imageURL = newURL;
          allMeal.push(mealData);
          map[meal.mealID] = mealData;
        } catch (err) {
          console.log(err);
        }
      })
    );
    setCart(cart);
    setOrderMeal(allMeal);
    setMealMap(map);
    setFalseCart(cart);
  };

  const deleteCartItem = async (mealId) => {
    var user = db.collection("users").doc(userId);
    var obj = falseCartItem.filter((meal) => meal.mealID !== mealId);
    try {
      await user.update({
        cart: obj,
      });
      showMessage({
        message: "Item Deleted",
        // description: "",
        type: "success",
      });
    } catch (err) {
      showMessage({
        message: "Some Error Occurred",
        description: err.message,
        type: "danger",
      });
    }
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
    var user = db.collection("users").doc(userId);
    user.update({
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
    var user = db.collection("users").doc(userId);
    user.update({
      cart: obj,
    });
  };

  const Payment = async (orderID, amt) => {
    const user = Firebase.auth().currentUser;
    var options = {
      description: "Order Payment",
      currency: "INR",
      key: process.env.RAZOR_ID,
      amount: amt.toString(),
      name: user.displayName,
      order_id: orderID,
      prefill: {
        email: user.email,
        name: user.displayName,
      },
      theme: { color: "#53a20e" },
      retry: {
        enabled: true,
        max_count: 1,
      },
      timeout: 300,
    };
    const data = await RazorpayCheckout.open(options);
    return data;
  };

  const finalCheckout = async () => {
    setIsPressed(true);
    var user = db.collection("users").doc(userId);
    try {
      await user.update({
        cart: falseCartItem,
      });
      if (!Firebase.auth().currentUser.emailVerified) {
        throw new Error(
          "Verify your Email from Profile Tab to continue further. If you have already verified your account please reauthenticate to see the changes"
        );
      }
      let res = await fetch(
        `https://afternoon-wildwood-34561.herokuapp.com/initiate?amount=${totalPrice}`
      );
      res = await res.json();
      const payRes = await Payment(res.id, res.amount);
      var orderedMeals = [];
      var tmp;
      for (var i = 0; i < falseCartItem.length; i++) {
        tmp = {
          ...falseCartItem[i],
          status: false,
        };
        orderedMeals.push(tmp);
      }
      var newOrder = { meals: orderedMeals };
      newOrder["status"] = false;
      newOrder["userID"] = Firebase.auth().currentUser.uid;
      newOrder["orderTotal"] = totalPrice;
      newOrder["paymentInfo"] = {
        method: "RazorPay Gateway",
        transactionID: payRes.razorpay_payment_id.split("_")[1],
      };

      const orderID = makeID(16);
      var usr = await user.get();
      usr = usr.data();
      await db.collection("orders").doc(orderID).set(newOrder);

      var userEntry = {
        orderID: orderID,
        price: totalPrice,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        status: false,
      };
      const vendorSet = new Set();
      var vendorPrice = {};
      for (var id in mealMap) {
        if (vendorPrice[mealMap[id].vendorID]) {
          vendorPrice[mealMap[id].vendorID] +=
            mealMap[id].price *
            falseCartItem.filter((meal) => meal.mealID === id)[0].quantity;
        } else {
          vendorPrice[mealMap[id].vendorID] =
            mealMap[id].price *
            falseCartItem.filter((meal) => meal.mealID === id)[0].quantity;
        }
      }
      await Promise.all(
        orderMeal.map(async (meal) => {
          if (!vendorSet.has(meal.vendorID)) {
            vendorSet.add(meal.vendorID);
            var vndr = await db.collection("vendors").doc(meal.vendorID).get();
            vndr = vndr.data();
            await db
              .collection("vendors")
              .doc(meal.vendorID)
              .update({
                orders: [
                  ...vndr.orders,
                  { ...userEntry, price: vendorPrice[meal.vendorID] },
                ],
              });

            axios.post("https://afternoon-wildwood-34561.herokuapp.com/mail/", {
              email: vndr.email,
              subject: "Order Placed",
              name: vndr.name,
              vendor: true,
              orderID: orderID,
              placed: false,
            });
          }
        })
      );
      await user.update({
        cart: [],
        orders: [...usr.orders, userEntry],
      });
      axios.post("https://afternoon-wildwood-34561.herokuapp.com/mail/", {
        email: Firebase.auth().currentUser.email,
        subject: "Order Placed",
        name: Firebase.auth().currentUser.displayName,
        vendor: false,
        orderID: orderID,
        placed: false,
      });

      showMessage({
        message: "Order Placed",
        description: "Your Order was Successfully placed",
        type: "success",
      });
      setTimeout(() => {
        showMessage({
          message: "Order Info",
          description: "Check Orders Tab for details",
          type: "success",
        });
      }, 2000);
      setTimeout(() => {
        props.navigation.pop();
      }, 4000);
    } catch (err) {
      setIsPressed(false);
      showMessage({
        message: "Order Placement Failed",
        description: err.message,
        type: "danger",
      });
    }
    // var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
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
                me.quantity = falseCartItem[idx].quantity;
                return (
                  <CartTile
                    cart
                    key={idx}
                    meal={me}
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
              marginVertical: 5,
              marginHorizontal: 5,
            }}
          >
            <Text
              style={{
                marginTop: 10,
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
            <Modal animationType="slide" transparent={true} visible={isPressed}>
              <View style={styles.centeredView}>
                <ActivityIndicator
                  animating={isPressed}
                  size="large"
                  color={Colors.red800}
                />
              </View>
            </Modal>
            <Button
              title="Proceed To Checkout"
              disabled={isPressed}
              onPress={finalCheckout}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});

export default Cart;
