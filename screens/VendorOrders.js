import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import Firebase from "../config/Firebase";
import AppLoading from "expo-app-loading";
import OrderTile from "../components/OrderTile";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
const screenHeight = Dimensions.get("window").height;
const Orders = (props) => {
  const [orderItem, setOrderItem] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const meals = useSelector((state) => state.meals.meals);

  var user = Firebase.auth().currentUser.uid;
  var db = Firebase.firestore();

  const fetchItems = async () => {
    var order = await db.collection("vendors").doc(user).get();
    setOrderItem(order.data().orders);
  };

  if (!isLoading) {
    return (
      <AppLoading
        startAsync={fetchItems}
        onFinish={() => {
          setIsLoading(true);
        }}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <View style={styles.orderContainer}>
          <Text style={styles.title}>All Orders</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon
            raised
            name="refresh"
            type="font-awesome"
            color="blue"
            onPress={() => setIsLoading(false)}
            size={18}
          />
        </View>
      </View>
      <ScrollView>
        {orderItem.map((me, idx) => {
          return (
            <OrderTile
              key={idx}
              orderId={me.orderID}
              price={me.price}
              date={me.date}
              status={me.status}
              navigation={props.navigation}
            />
          );
        })}
      </ScrollView>
      <View style={styles.listContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "roboto-regular",
    fontWeight: "bold",
    fontSize: 22,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  orderContainer: {
    width: "60%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
  },
  listContainer: {
    height: screenHeight / 5,
  },
});

export default Orders;
