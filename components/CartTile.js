import React from "react";
import { TouchableNativeFeedback } from "react-native";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import Colors from "../constants/colors";
import Counter from "./Counter";
import greenTick from "../assets/greenTick.jpg";
import yellowTick from "../assets/yellowTick.jpg";

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
}) => {
  return (
    <View style={styles.container}>
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
                source={status ? greenTick : yellowTick}
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
});

export default CartTile;
