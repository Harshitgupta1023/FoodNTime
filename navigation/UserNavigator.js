import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Orders from "../screens/Orders";
import HomePage from "../screens/HomePage";
import Profile from "../screens/Profile";
import Cart from "../screens/Cart";
import HeaderButtonss from "../components/HeaderButtonss";
import Colors from "../constants/colors";
const Tab = createMaterialBottomTabNavigator();
const tabBarOption =
  Platform.OS === "android"
    ? {
        activeColor: Colors.primaryColor,
        shifting: true,
      }
    : {
        activeTintColor: Colors.accentColor,
      };
const UserTab = () => {
  return (
    <Tab.Navigator {...tabBarOption}>
      <Tab.Screen
        name="meals"
        component={HomePage}
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
        name="order"
        component={Orders}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons size={23} color={color} name="ios-restaurant" />;
          },
          tabBarColor: "grey",
        }}
      />
      <Tab.Screen
        name="account"
        component={Profile}
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

const Stack = createStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Meals"
        component={UserTab}
        options={({ navigation, route }) => ({
          headerTitle:
            getFocusedRouteNameFromRoute(route) === "undefined"
              ? meals
              : getFocusedRouteNameFromRoute(route),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtonss}>
              <Item
                title="fav"
                iconName="cart-outline"
                onPress={() => navigation.navigate("cart")}
              />
              <Item
                title="fav"
                iconName="notifications-outline"
                onPress={() => alert("search")}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen name="cart" component={Cart} />
    </Stack.Navigator>
  );
};

export default UserNavigator;
