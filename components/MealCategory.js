import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Checkbox } from "react-native-paper";

const MealCategory = (props) => {
  const { veg, setVeg } = props;
  return (
    <View style={styles.row}>
      <Text style={styles.text}>Vegetarian</Text>
      <Checkbox
        status={veg ? "checked" : "unchecked"}
        onPress={() => setVeg((cur) => !cur)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  text: {
    fontSize: 16,
    color: "#565656",
  },
});

export default MealCategory;
