import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Firebase from "../config/Firebase";
import AppLoading from "expo-app-loading";
import OrderTile from "../components/OrderTile";

const Orders = (props) => {
  const [orderItem, setOrderItem] = useState();
  const [isLoading, setIsLoading] = useState(false);
  var user = Firebase.auth().currentUser.uid;
  var db = Firebase.firestore();
  const fetchItems = async () => {
    var order = await db.collection("users").doc(user).get();
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
      <Text style={styles.title}>Order</Text>
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
    marginTop: 15,
    textAlign: "center",
  },
});

export default Orders;
