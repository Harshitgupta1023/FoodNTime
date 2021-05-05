import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Colors from "../constants/colors";
import VendorDashBoard from "../screens/VendorDashBoard";
import VendorOrders from "../screens/VendorOrders";
import VendorAccount from "../screens/VendorAccount";
const Tab = createMaterialBottomTabNavigator();
const tabBarOption = {
  activeColor: Colors.primaryColor,
  shifting: true,
};
const VendorNavigator = () => {
  return (
    <Tab.Navigator {...tabBarOption}>
      <Tab.Screen
        name="meals"
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
        component={VendorAccount}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons size={23} color={color} name="ios-restaurant" />;
          },
          tabBarColor: Colors.accentColor,
        }}
      />
    </Tab.Navigator>
  );
};

export default VendorNavigator;
