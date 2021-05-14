import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
const Counter = (props) => {
  return (
    <View style={styles.counter}>
      <Icon
        raised
        name="add-outline"
        type="ionicon"
        size={16}
        onPress={props.onIncrease}
      />
      <View style={{ justifyContent: "center" }}>
        <Text style={{ fontFamily: "roboto-light", fontSize: 18 }}>
          {props.quantity}
        </Text>
      </View>
      <Icon
        raised
        name="remove-outline"
        type="ionicon"
        size={16}
        onPress={props.onDecrease}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Counter;
