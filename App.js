import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Navigator from "./navigation/Navigator";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import Orders from "./screens/Orders";
const fetchFonts = () => {
  return Font.loadAsync({
    "roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }

  return <Navigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
