import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
const NewInputText = (props) => {
  return (
    <View>
      <TextInput {...props} style={{ ...styles.input, ...props.style }} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
  },
});
export default NewInputText;
