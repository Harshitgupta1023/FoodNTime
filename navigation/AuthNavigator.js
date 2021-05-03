import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import StartUpScreen from "../screens/GetStarted";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";

const Tab = createMaterialBottomTabNavigator();

function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Signup" component={SignUpScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function AunthenticateNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartUp" component={StartUpScreen} />
        <Stack.Screen name="authentication" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AunthenticateNavigator;
