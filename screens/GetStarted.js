import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import firebase from "../config/Firebase";

const StartUpScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={{ margin: 20, fontFamily: "roboto-light" }}>
        This is Start UP Screen!!!
      </Text>
      <Button
        raised={true}
        title="START"
        onPress={() => {
          var user = firebase.auth().currentUser;
          if (user) {
            props.navigation.replace("Food N Time");
          }
          props.navigation.replace("Authentication");
        }}
        buttonStyle={{ width: 100 }}
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
