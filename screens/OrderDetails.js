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
import { useSelector } from "react-redux";
import CartTile from "../components/CartTile";
import greenTick from "../assets/greenTick.jpg";
import yellowTick from "../assets/yellowTick.jpg";

const OrderDetails = (props) => {
  const { orderId, finalStatus, created } = props.route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [orderedMeal, setOrderedMeals] = useState();
  const [orderedMealId, setOrderedMealsId] = useState();

  const meals = useSelector((state) => state.meals.meals);
  const finalOrderMeals = [];
  var db = Firebase.firestore();

  const fetchItems = async () => {
    var order = await db.collection("orders").doc(orderId).get();
    // console.log(order.data());
    var orderData = order.data().meals;
    var mealId = [];
    orderData.map((dat) => {
      mealId.push(dat.mealID);
    });
    setOrderedMeals(order.data().meals);
    setOrderedMealsId(mealId);
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

  var Total = 0;
  finalOrderMeals.map((dat) => {
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
          {finalOrderMeals.map((me, idx) => {
            return <CartTile meal={me} key={idx} noCounter />;
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
            source={finalStatus ? greenTick : yellowTick}
            style={{ width: 40, height: 40, margin: 5 }}
          />
          <Text style={{ fontFamily: "roboto-regular", fontWeight: "bold" }}>
            {finalStatus ? "Completed" : "Processing"}
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

export default OrderDetails;
