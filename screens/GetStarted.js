import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Button } from "react-native-elements";

import Firebase from "../config/Firebase";
import appLogo from "../assets/appLogo1.png";
import appName from "../assets/appName.png";
import colors from "../constants/colors";

const StartUpScreen = (props) => {
  return (
    <View style={styles.screen}>
      <ImageBackground source={appName} style={styles.name} />
      <ImageBackground source={appLogo} style={styles.image} />
      <Button
        title="LAUNCH"
        onPress={() => {
          var user = Firebase.auth().currentUser;
          if (user) {
            props.navigation.replace("Food N Time");
          }
          props.navigation.replace("Authentication");
        }}
        titleStyle={{ color: colors.accentColor }}
        buttonStyle={{
          width: 150,
          backgroundColor: "white",
          borderColor: colors.accentColor,
          borderRadius: 20,
          borderWidth: 2,
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
    backgroundColor: colors.primaryColor,
  },
  image: {
    width: "100%",
    height: 500,
  },
  name: {
    width: 300,
    height: 90,
  },
});
export default StartUpScreen;
