import React from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import Colors from "../constants/colors";
import VendorDashBoard from "../screens/VendorDashBoard";
import VendorOrders from "../screens/VendorOrders";
import VendorAccount from "../screens/VendorAccount";
import UpdateMeal from "../screens/UpdateMeal";
import PasswordProfile from "../screens/PasswordProfile";

const ProfileStack = createStackNavigator();
const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={VendorAccount}
      />
      <ProfileStack.Screen
        options={{ headerShown: false }}
        name="Passwordprofile"
        component={PasswordProfile}
      />
    </ProfileStack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
const tabBarOption = {
  activeColor: Colors.primaryColor,
  shifting: true,
};

const Stack = createStackNavigator();

const VendorNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Your Meals"
        component={VendorTab}
        options={({ navigation, route }) => ({
          headerTitle:
            getFocusedRouteNameFromRoute(route) === "undefined"
              ? "Your Meals"
              : getFocusedRouteNameFromRoute(route),
        })}
      ></Stack.Screen>
      <Stack.Screen name="mealDetail" component={UpdateMeal}></Stack.Screen>
    </Stack.Navigator>
  );
};

const VendorTab = () => {
  return (
    <Tab.Navigator {...tabBarOption}>
      <Tab.Screen
        name="Your Meals"
        component={VendorDashBoard}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons size={23} color={color} name="fast-food-outline" />
            );
          },
          tabBarColor: Colors.accentColor,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={VendorOrders}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons size={23} color={color} name="ios-restaurant" />;
          },
          tabBarColor: "grey",
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome size={23} color={color} name="user" />;
          },
          tabBarColor: Colors.accentColor,
        }}
      />
    </Tab.Navigator>
  );
};

export default VendorNavigator;
