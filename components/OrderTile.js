import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import Colors from "../constants/colors";
import greenTick from "../assets/greenTick.png";
import yellowTick from "../assets/yellowTick.jpg";
import { Image } from "react-native";
import { TouchableNativeFeedback } from "react-native";

const screenWidth = Dimensions.get("window").width;

const OrdersTile = ({ orderId, price, date, status, navigation }) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        navigation.navigate("orderDetails", {
          orderId: orderId,
          finalStatus: status,
          created: date,
        });
      }}
    >
      <View style={styles.container}>
        <View style={{ marginLeft: -20 }}>
          <View style={styles.order}>
            <Text>OrderID:</Text>
            <Text style={styles.orderText}>{orderId}</Text>
          </View>
          <View style={styles.date}>
            <Text>Date/Time :</Text>
            <Text style={styles.dateText}>{date.toDate().toDateString()}</Text>
            <Text style={styles.dateText}>
              {date.toDate().toLocaleTimeString()}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "25%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Total:</Text>
          <View style={styles.priceConainer}>
            <Text style={{ fontSize: 20, color: "white" }}>₹ {price}</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Text>{status ? "Completed" : "Processing"}</Text> */}
            <Image
              source={status ? greenTick : yellowTick}
              style={{ width: 50, height: 50 }}
            />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    width: screenWidth - 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  orderText: {
    fontSize: 17,
    fontFamily: "roboto-regular",
  },
  date: {
    marginTop: 10,
  },
  dateText: {
    fontSize: 15,
    fontFamily: "roboto-regular",
  },
  priceConainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0,200,25,0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: Colors.accentColor,
    marginBottom: 5,
    height: 30,
    width: "90%",
  },
});

export default OrdersTile;
