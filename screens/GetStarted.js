import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
const StartUpScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={{ fontFamily: "roboto-light" }}>
        This is Start UP Screen!!!
      </Text>
      <Button
        title="GO"
        onPress={() => {
          props.navigation.navigate("authentication");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default StartUpScreen;
