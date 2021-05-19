import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import Firebase from "../config/Firebase";
import AppLoading from "expo-app-loading";
import OrderTile from "../components/OrderTile";
import { Button, Icon } from "react-native-elements";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Orders = (props) => {
  const [orderItem, setOrderItem] = useState();
  const [isLoading, setIsLoading] = useState(false);

  var user = Firebase.auth().currentUser.uid;
  var db = Firebase.firestore();

  const fetchItems = async () => {
    var order = await db.collection("users").doc(user).get();
    var orders = order.data().orders;
    orders.sort((a, b) => a.date[0] > b.date[0]);
    setOrderItem(orders);
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
      <View
        style={{
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View
          style={{ justifyContent: "center", width: "70%", marginLeft: 20 }}
        >
          <Text style={styles.title}>Order</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            // marginLeft: 80,
          }}
        >
          <Icon
            raised
            name="refresh"
            type="font-awesome"
            color="blue"
            onPress={() => setIsLoading(false)}
          />
        </View>
      </View>
      <View
        style={{
          height: (3 * Dimensions.get("window").height) / 5 + 50,
        }}
      >
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
