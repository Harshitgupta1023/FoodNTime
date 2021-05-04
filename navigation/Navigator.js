import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import AuthNavigator from "./AuthNavigator";
import UserNavigator from "./UserNavigator";

const Navigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
