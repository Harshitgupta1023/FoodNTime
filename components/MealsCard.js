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
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/colors";

const MealsCard = ({ meals, navigation, mealId }) => {
  // console.log(meals);
  const { name, discount, price, imageURL, time, rating } = meals;

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.container}>
      <TouchableCmp
        onPress={() => {
          navigation.navigate("mealDetail", { meals: meals, mealId: mealId });
        }}
      >
        <View style={styles.mealItem}>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground source={{ uri: imageURL }} style={styles.bgImage}>
              <View
                style={{
                  width: "80%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginLeft: 60,
                  marginBottom: 110,
                }}
              >
                <Text style={styles.titletime}>{time} min</Text>
              </View>
              {discount !== 0 ? <DiscountImage discount={discount} /> : null}

              <View
                style={{
                  ...styles.titleContainer,
                }}
              >
                <Text style={styles.title} numberOfLines={2}>
                  {name}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <View
              style={{
                ...styles.ratingContainer,
                width: "25%",
                backgroundColor: Colors.accentColor,
              }}
            >
              <Text style={{ fontSize: 16, color: "white" }}>₹ {price}</Text>
            </View>
            {rating === undefined ? null : (
              <View style={styles.ratingContainer}>
                <Text style={{ fontSize: 16, color: "white" }}>
                  {rating[0].rating}
                </Text>
                <View style={{ justifyContent: "center", paddingLeft: 3 }}>
                  <AntDesign name="star" size={16} color="white" />
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "rgba(0,70,105,0.2)",
    borderRadius: 10,
    overflow: "hidden",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
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
    height: "85%",
  },
  mealDetail: {
    height: "15%",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MealsCard;
