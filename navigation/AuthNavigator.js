import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import StartUpScreen from "../screens/GetStarted";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";
import UserNavigator from "./UserNavigator";
import Cart from "../screens/Cart";
import HeaderButtonss from "../components/HeaderButtonss";

import { Text } from "react-native";
import VendorNavigator from "./VendorNavigator";

const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarLabel: <Text style={{ fontSize: 16 }}>LogIn</Text>,
          tabBarIcon: (tabInfo) => {
            return (
              <FontAwesome name="sign-in" size={25} color={tabInfo.color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Signup"
        component={SignUpScreen}
        options={{
          tabBarLabel: <Text style={{ fontSize: 16 }}>SignUp</Text>,
          tabBarIcon: (tabInfo) => {
            return (
              <FontAwesome name="user-plus" size={23} color={tabInfo.color} />
            );
          },
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
      <Stack.Screen
        name="Food N Time"
        component={UserNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Vendor Dashboard" component={VendorNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
