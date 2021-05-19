import React, { useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Icon, Overlay, Rating } from "react-native-elements";
import Colors from "../constants/colors";
import Counter from "./Counter";
import greenTick from "../assets/greenTick.jpg";
import yellowTick from "../assets/yellowTick.jpg";
import { RadioButton } from "react-native-paper";
import Firebase from "../config/Firebase";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const CartTile = ({
  meal,
  onDel,
  onIncrease,
  onDecrease,
  noCounter,
  vendor,
  orderID,
  handleChangeMealStatus,
  customer,
}) => {
  const { imageURL, name, price, quantity, time, status, mealID } = meal;

  const [status0, setStatus0] = useState(status);
  const [visible, setVisible] = useState(false);
  const [isRated, setIsRated] = useState(false);

  const user = Firebase.auth().currentUser.uid;

  const OverLayComp = (props) => {
    return (
      <Overlay
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(!visible);
        }}
        overlayStyle={{ width: screenWidth / 2, padding: 15 }}
      >
        <Text>Grab It from :</Text>
        <Text>{props.address}</Text>
        <Text></Text>
        <Text>Thank You!! For Ordering :')' </Text>
      </Overlay>
    );
  };

  const handleStatus = async () => {
    var db = Firebase.firestore().collection("orders").doc(orderID);
    var meals = await db.get();
    var mealsData = meals.data().meals;
    mealsData.map((dat) => {
      dat.mealID === mealID
        ? (dat.status = !status0)
        : (dat.status = dat.status);
    });
    await db.update({
      meals: mealsData,
    });
    handleChangeMealStatus(mealID, !status0);
    setStatus0(!status0);
  };

  const handleRating = async (mealID, ratingValue) => {
    var db = Firebase.firestore().collection("meals").doc(mealID);
    var ratin = await db.get();
    var ratingData =
      ratin.data().rating === undefined ? [] : ratin.data().rating;
    var filteredData = ratingData.filter((dat) => dat.userID !== user);
    var updatedRating = [...filteredData, { userID: user, value: ratingValue }];
    // ERROR baar baar kar skte change .
    await db.update({
      rating: updatedRating,
    });
    setIsRated(true);
  };
  return (
    <View style={styles.container}>
      <View>
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
        {vendor ? (
          <View style={{ borderTopWidth: 1, margin: 10 }}></View>
        ) : null}
        {vendor ? (
          <View style={styles.vendorContainer}>
            <Text style={styles.vendorText}>Meal Status</Text>
            <View style={styles.statusOption}>
              <Text>Processing</Text>
              <RadioButton
                status={!status0 ? "checked" : "unchecked"}
                onPress={() => handleStatus()}
              />
            </View>
            <View
              style={{
                ...styles.statusOption,
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
      {/* check 1 if on orders, check 2 if a customer, check3 if status done*/}
      {noCounter ? (
        customer ? (
          status ? (
            <View
              style={{
                borderTopWidth: 1,
                marginHorizontal: 15,
                marginTop: 5,
                marginBottom: 3,
              }}
            ></View>
          ) : null
        ) : null
      ) : null}
      {noCounter ? (
        customer ? (
          status ? (
            <View style={styles.bottomContainer}>
              <View style={styles.ratingContainer}>
                <Text style={{ fontFamily: "roboto-regular", fontSize: 20 }}>
                  Rating :{"  "}
                </Text>
                <Rating
                  type="custom"
                  imageSize={25}
                  startingValue={0}
                  readonly={isRated}
                  onFinishRating={(rating) => handleRating(mealID, rating)}
                />
              </View>
              <View style={styles.storeContainer}>
                <Icon
                  name="map-outline"
                  type="ionicon"
                  size={25}
                  color="green"
                  containerStyle={{
                    borderWidth: 0.3,
                    borderRadius: 50,
                    padding: 5,
                    backgroundColor: "rgba(250,250,250,1)",
                    elevation: 5,
                  }}
                  onPress={() => {
                    setVisible(!visible);
                  }}
                />
                {visible ? <OverLayComp address={meal.storeAddress} /> : null}
              </View>
            </View>
          ) : null
        ) : null
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
  statusOption: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  ratingContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  storeContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export default CartTile;
