import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import Firebase from "../config/Firebase";
import AppLoading from "expo-app-loading";

import CartTile from "../components/CartTile";
import { useSelector } from "react-redux";

import greenTick from "../assets/greenTick.jpg";
import yellowTick from "../assets/yellowTick.jpg";
const VendorOrderDetails = (props) => {
  const { orderId, created } = props.route.params;
  const [isLoading, setIsLoading] = useState(false);

  const [orderedMeal, setOrderedMeals] = useState();
  const [finalOrderStatus, setFinalOrderStatus] = useState();

  const [originalVendorOrders, setOriginalVendorOrders] = useState();
  const [originalOrder, setOriginalOrder] = useState();

  const [userId, setUserId] = useState();
  const meals = useSelector((state) => state.meals.meals);
  const finalOrderMeals = [];

  var db = Firebase.firestore();
  const user = Firebase.auth().currentUser.uid;

  const fetchItems = async () => {
    var order = await db.collection("orders").doc(orderId).get();
    var orderData = order.data();
    setOriginalOrder(orderData.meals);
    setUserId(orderData.userID);

    var vendors = await db.collection("vendors").doc(user).get();
    var vendorsOrders = vendors.data().orders;
    var renderOrderDetails = vendorsOrders.filter(
      (dat) => dat.orderID === orderId
    );
    setOriginalVendorOrders(vendorsOrders);
    setFinalOrderStatus(renderOrderDetails[0].status);
    setOrderedMeals(orderData.meals);
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
  orderedMeal.map((dat) => {
    const meal0 = meals.filter((data) => data.id === dat.mealID);
    const meal1 = { ...dat, ...meal0[0] };
    finalOrderMeals.push(meal1);
  });
  const vendorMeals = finalOrderMeals.filter((me) => me.vendorID === user);

  const handleChangeMealStatus = async (md, newStatus) => {
    vendorMeals.map((dat) => {
      dat.mealID === md ? (dat.status = newStatus) : dat.status;
    });

    const status1 = vendorMeals.filter((dat) => !dat.status);
    setFinalOrderStatus(status1.length === 0 ? true : false);

    // updating vendor side order status
    const updatedOrder = originalVendorOrders.filter(
      (dat) => dat.orderID === orderId
    );
    const newVendorOrders = originalVendorOrders.filter(
      (dat) => dat.orderID !== orderId
    );
    updatedOrder[0].status = !finalOrderStatus;

    db.collection("vendors")
      .doc(user)
      .update({
        orders: [...newVendorOrders, ...updatedOrder],
      });

    // updating main order status
    originalOrder.map((dat) =>
      dat.mealID === md ? (dat.status = !finalOrderStatus) : dat.status
    );
    const finalOrderUserStatus = originalOrder.filter(
      (dat) => !dat.status
    ).length;
    db.collection("orders")
      .doc(orderId)
      .update({
        status: finalOrderUserStatus === 0 ? true : false,
      });

    //  updating user order status
    if (finalOrderUserStatus === 0) {
      var userDa = await db.collection("users").doc(userId).get();
      var userData = userDa.data();
      var newUserData = [];
      userData.orders.map((dat) => {
        dat.orderID === orderId ? (dat.status = true) : dat.status;
        newUserData.push(dat);
      });
      db.collection("users").doc(userId).update({
        orders: newUserData,
      });
    }
  };
  var Total = 0;
  vendorMeals.map((dat) => {
    Total = Total + dat.quantity * dat.price;
  });

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Order Details </Text>
      <View
        style={{
          height: (3 * Dimensions.get("window").height) / 5,
        }}
      >
        <ScrollView>
          {vendorMeals.map((me, idx) => {
            return (
              <CartTile
                noCounter
                meal={me}
                key={idx}
                vendor
                orderID={orderId}
                handleChangeMealStatus={handleChangeMealStatus}
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.bottomTextContainer}>
        <View style={{ marginLeft: 20 }}>
          <Text style={styles.bottomText}>
            Total :
            <Text
              style={{
                fontFamily: "roboto-regular",
                fontSize: 20,
              }}
            >
              ₹ {Total}
            </Text>
          </Text>
          <View style={styles.date}>
            <Text style={{ fontSize: 18 }}>Date/Time :</Text>
            <Text style={styles.dateText}>
              {created.toDate().toDateString()}
            </Text>
            <Text style={styles.dateText}>
              {created.toDate().toLocaleTimeString()}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Final Status </Text>
          <Image
            source={finalOrderStatus ? greenTick : yellowTick}
            style={{ width: 40, height: 40, margin: 5 }}
          />
          <Text style={{ fontFamily: "roboto-regular", fontWeight: "bold" }}>
            {finalOrderStatus ? "Completed" : "Processing"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    flex: 1,
  },
  title: {
    fontFamily: "roboto-regular",
    fontSize: 22,
    marginTop: 10,
    textAlign: "center",
  },
  bottomTextContainer: {
    height: "21%",
    borderRadius: 5,
    elevation: 2,
    marginVertical: 10,
    marginHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottomText: {
    margin: 15,
    textAlign: "left",
    fontSize: 18,
  },
  date: {
    marginTop: -10,
    marginLeft: 15,
  },
  dateText: {
    fontSize: 20,
    fontFamily: "roboto-regular",
  },
});

export default VendorOrderDetails;
