import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from "react-native";
const MealsCard = ({ meals, navigation, mealId }) => {
  const { name, discount, price, imageURL, time } = meals;
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate("mealDetail", { meals: meals });
        }}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.tinyLogo} source={{ uri: imageURL }} />
          <Text>{name}</Text>
          <View style={styles.detailContainer}>
            <Text>{time}min</Text>
            <Text>{price}Rs</Text>
            <Text>{discount}%</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imageContainer: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  detailContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  tinyLogo: {
    width: "100%",
    height: 150,
  },
});

export default MealsCard;
