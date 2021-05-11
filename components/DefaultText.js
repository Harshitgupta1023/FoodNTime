import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DefaultText = (props) => {
  return (
    <View style={styles.container}>
      <Text {...props} style={{ ...styles.text, ...props.style }}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 2,
    borderWidth: 0.1,
  },
  text: {
    fontFamily: "roboto-light",
  },
});

export default DefaultText;
