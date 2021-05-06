import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

const VendorDashBoard = (props) => {
  return (
    <View style={styles.screen}>
      <Text>YOUR MEAL OFFERINGS</Text>
      <View style={styles.fab}>
        <FAB
          large
          icon="plus"
          onPress={() => props.navigation.navigate("Add Meal")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    paddingLeft: "70%",
    paddingTop: 300,
  },
});

export default VendorDashBoard;
