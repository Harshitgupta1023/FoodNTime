import React, { useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import Colors from "../constants/colors";
import Counter from "./Counter";
import greenTick from "../assets/greenTick.jpg";
import yellowTick from "../assets/yellowTick.jpg";
import { RadioButton } from "react-native-paper";
import Firebase from "../config/Firebase";
import firebase from "firebase";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const CartTile = ({
  imageURL,
  name,
  price,
  quantity,
  time,
  onDel,
  onIncrease,
  onDecrease,
  noCounter,
  status,
  vendor,
  orderID,
  mealId,
  setFinalVendorStatus,
}) => {
  const user = Firebase.auth().currentUser.uid;
  const [status0, setStatus0] = useState(status);
  const handleStatus = async () => {
    var db = Firebase.firestore().collection("orders").doc(orderID);
    var meals = await db.get();
    var email = meals.data().email;
    var mealsData = meals.data().meals;
    mealsData.map((dat) => {
      dat.mealID === mealId
        ? (dat.status = !status0)
        : (dat.status = dat.status);
    });
    await db.update({
      meals: mealsData,
    });
    var status1 = mealsData.filter((dat) => dat.status === false);
    var vendorServer = Firebase.firestore().collection("vendors").doc(user);
    var vendorss = await vendorServer.get();
    var copyVendorData = vendorss.data().orders;
    copyVendorData.map((meal) => {
      meal.orderID === orderID
        ? (meal.status = status1.length === 0 ? true : false)
        : (meal.status = meal.status);
    });
    await vendorServer.update({
      orders: copyVendorData,
    });
    setFinalVendorStatus(status1.length === 0 ? true : false);
    console.log(email);
    if (status1.length === 0) {
      axios.post("https://afternoon-wildwood-34561.herokuapp.com/mail/", {
        email: email,
        subject: "Order Ready!!!",
        name: "User",
        vendor: false,
        orderID: orderID,
        placed: true,
      });
    }
    setStatus0(!status0);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View>
          <Image style={styles.image} source={{ uri: imageURL }} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "75%",
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.nameText} numberOfLines={2}>
              {name}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.titletime}>{time} min</Text>
              <Text style={{ ...styles.titletime }}>₹ {price} </Text>
            </View>
          </View>
          <View style={styles.amountContainer}>
            {noCounter ? (
              <View style={{ ...styles.counter, justifyContent: "center" }}>
                <Text style={{ fontFamily: "roboto-light", fontSize: 18 }}>
                  {quantity} x
                </Text>
              </View>
            ) : (
              <Counter
                quantity={quantity}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <View
                style={{
                  ...styles.priceConainer,
                  width: "60%",
                  backgroundColor: Colors.accentColor,
                }}
              >
                <Text style={{ fontSize: 16, color: "white" }}>
                  ₹ {quantity * price}
                </Text>
              </View>
              {status !== undefined ? (
                <Image
                  source={status0 ? greenTick : yellowTick}
                  style={{ width: 30, height: 30 }}
                />
              ) : (
                <Icon
                  color="red"
                  name="trash"
                  type="ionicon"
                  onPress={() => {
                    onDel();
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </View>
      {vendor ? <View style={{ borderTopWidth: 1, margin: 10 }}></View> : null}
      {vendor ? (
        <View style={styles.vendorContainer}>
          <Text style={styles.vendorText}>Meal Status</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 8,
            }}
          >
            <Text>Processing</Text>
            <RadioButton
              disabled={status0}
              status={!status0 ? "checked" : "unchecked"}
              onPress={() => handleStatus()}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 5,
            }}
          >
            <Text>Completed</Text>
            <RadioButton
              status={status0 ? "checked" : "unchecked"}
              onPress={() => handleStatus()}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    width: screenWidth - 20,
  },
  image: {
    width: 80,
    height: 70,
    borderRadius: 20,
  },
  textContainer: {
    paddingHorizontal: 10,
    width: 140,
    justifyContent: "space-around",
  },
  nameText: {
    fontFamily: "roboto-regular",
    fontSize: 20,
  },
  titletime: {
    textAlign: "center",
    fontFamily: "roboto-light",
    fontSize: 16,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
    marginHorizontal: 2,
    width: "45%",
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 1,
    width: screenWidth / 3.6,
  },
  counter: {
    flexDirection: "row",
    width: Dimensions.get("window").width / 4.5,
    height: Dimensions.get("window").height / 17,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 50,
    marginBottom: 10,
  },
  priceConainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0,200,25,0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  vendorContainer: {
    flexDirection: "row",
    width: "100%",
  },
  vendorText: {
    fontFamily: "roboto-regular",
    fontSize: 18,
  },
});

export default CartTile;
