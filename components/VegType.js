import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { RadioButton } from "react-native-paper";
const VegType = (props) => {
  const { vegType, setVegType, screenStyle, extra } = props;

  return (
    <View style={{ ...styles.screen, ...screenStyle }}>
      {extra ? (
        <View style={styles.row}>
          <Text style={styles.text}>None</Text>
          <RadioButton
            status={vegType == 0 ? "checked" : "unchecked"}
            onPress={() => setVegType(0)}
          />
        </View>
      ) : null}
      <View style={styles.row}>
        <Text style={styles.text}>Vegetarian</Text>
        <RadioButton
          status={vegType == 1 ? "checked" : "unchecked"}
          onPress={() => setVegType(1)}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Non Vegetarian</Text>
        <RadioButton
          status={vegType == 2 ? "checked" : "unchecked"}
          onPress={() => setVegType(2)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  screen: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  text: {
    fontSize: 16,
    color: "#565656",
  },
});

export default VegType;
