import React from "react";
import { ImageBackground } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";

import DiscountImage from "./DiscountImage";
import SoldOutImage from "./SoldOutImage";

import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/colors";
import { showMessage } from "react-native-flash-message";

const MealsCard = ({ meals, navigation, mealId, vendor }) => {
  // console.log(meals);
  const { name, discount, price, imageURL, time, rating, available } = meals;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const Openable = async () => {
    if (available) {
      navigation.navigate("mealDetail", { meals: meals, mealId: mealId });
    } else {
      if (vendor) {
        navigation.navigate("mealDetail", { meals: meals, mealId: mealId });
      } else {
        showMessage({
          message: "SOLD OUT!!",
          description: "Item already sold out",
          type: "danger",
        });
      }
    }
  };
  const ratingData = rating;
  var ratingValue = ratingData ? 0 : 5;
  ratingData
    ? ratingData.map((dat) => (ratingValue = ratingValue + parseInt(dat.value)))
    : null;
  ratingValue =
    ratingValue === 0
      ? 5
      : Math.round((ratingValue / (ratingData ? ratingData.length : 1)) * 10) /
        10;

  return (
    <TouchableCmp onPress={Openable}>
      <View style={styles.container}>
        <View style={{ ...styles.mealItem, height: vendor ? 200 : 230 }}>
          <View
            style={{
              ...styles.mealRow,
              ...styles.mealHeader,
              height: vendor ? "83%" : "73%",
            }}
          >
            <ImageBackground source={{ uri: imageURL }} style={styles.bgImage}>
              <View style={available ? null : styles.sold}>
                <View
                  style={{
                    width: "80%",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    marginLeft: 60,
                    marginBottom: 110,
                    marginTop: 3,
                  }}
                >
                  <Text style={styles.titletime}>{time} min</Text>
                </View>
                {discount !== 0 ? <DiscountImage discount={discount} /> : null}

                {available ? null : <SoldOutImage />}
                <View
                  style={{
                    ...styles.titleContainer,
                  }}
                >
                  <Text style={styles.title} numberOfLines={2}>
                    {name}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={{ padding: 2 }}>
            <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
              <View
                style={{
                  ...styles.ratingContainer,
                  width: "25%",
                  backgroundColor: Colors.accentColor,
                  margin: 2,
                  padding: 1,
                }}
              >
                <Text style={{ fontSize: 16, color: "white" }}>₹ {price}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={{ fontSize: 16, color: "white" }}>
                  {ratingValue}
                </Text>
                <View style={{ justifyContent: "center", paddingLeft: 3 }}>
                  <AntDesign name="star" size={16} color="white" />
                </View>
              </View>
            </View>
            {vendor ? null : (
              <View
                style={{
                  borderTopWidth: 1,
                  marginHorizontal: 10,
                  marginTop: 3,
                  marginBottom: 1,
                }}
              ></View>
            )}
            {vendor ? null : (
              <View
                style={{
                  ...styles.mealRow,
                  ...styles.mealDetail,
                }}
              >
                <Text> Offered By : {meals.vendorName}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  mealItem: {
    height: 230,
    width: "100%",
    backgroundColor: "rgba(0,0,105,0.2)",
    borderRadius: 10,
    overflow: "hidden",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  sold: {
    backgroundColor: "rgba(255,255,255,0.5)",
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    width: "15%",
    backgroundColor: "rgba(0,200,25,0.8)",
    justifyContent: "center",
    borderRadius: 10,
  },
  title: {
    fontFamily: "roboto-light",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  titletime: {
    textAlign: "center",
    fontFamily: "roboto-light",
    fontSize: 16,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    width: "25%",
  },
  mealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "75%",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MealsCard;
