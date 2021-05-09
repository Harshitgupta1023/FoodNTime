import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import FlashMessage from "react-native-flash-message";

import AuthNavigator from "./AuthNavigator";
import UserNavigator from "./UserNavigator";
const Navigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
      <FlashMessage position="bottom" />
    </NavigationContainer>
  );
};

export default Navigator;
