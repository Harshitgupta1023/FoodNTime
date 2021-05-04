import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import StartUpScreen from "../screens/GetStarted";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";
import UserNavigator from "./UserNavigator";

import { Text } from "react-native";

const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarLabel: <Text style={{ fontSize: 16 }}>LogIn</Text>,
        }}
      />
      <Tab.Screen
        name="Signup"
        component={SignUpScreen}
        options={{
          tabBarLabel: <Text style={{ fontSize: 16 }}>SignUp</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StartUp" component={StartUpScreen} />
      <Stack.Screen name="Authentication" component={MainNavigator} />
      <Stack.Screen name="Food N Time" component={UserNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
