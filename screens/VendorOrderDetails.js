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
import greenTick from "../assets/greenTick.png";
import yellowTick from "../assets/yellowTick.jpg";

const VendorOrderDetails = (props) => {
  const { orderId, finalStatus, created } = props.route.params;
  const [finalVendorStatus, setFinalVendorStatus] = useState(finalStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [orderedMeal, setOrderedMeals] = useState();
  const [orderedMealId, setOrderedMealsId] = useState();
  const user = Firebase.auth().currentUser.uid;
  const [meals, setMeals] = useState([]);
  const finalOrderMeals = [];
  var db = Firebase.firestore();
  var storage = Firebase.storage().ref();

  const fetchItems = async () => {
    var order = await db.collection("orders").doc(orderId).get();
    var orderData = order.data().meals;
    var mealId = [];
    orderData.map((dat) => {
      mealId.push(dat.mealID);
    });
    setOrderedMeals(order.data().meals);
    setOrderedMealsId(mealId);
    var obj = {};
    var reduxObj = [];
    var dat = await db.collection("meals").get();
    await Promise.all(
      dat.docs.map(async (doc) => {
        obj[doc.id] = doc.data();
        try {
          const newURL = await storage
            .child(doc.data().imageURL)
            .getDownloadURL();
          obj[doc.id].imageURL = newURL;
          reduxObj.push({ id: doc.id, ...obj[doc.id] });
        } catch (err) {}
      })
    );
    setMeals(reduxObj);
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
    dat.vendorID === user ? (Total = Total + dat.quantity * dat.price) : Total;
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
            return me.vendorID === user ? (
              <CartTile
                noCounter
                status={me.status}
                key={idx}
                imageURL={me.imageURL}
                name={me.name}
                price={me.price}
                quantity={me.quantity}
                time={me.time}
                vendor
                mealId={me.mealID}
                orderID={orderId}
                setFinalVendorStatus={setFinalVendorStatus}
              />
            ) : null;
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
            source={finalVendorStatus ? greenTick : yellowTick}
            style={{ width: 40, height: 40, margin: 5 }}
          />
          <Text style={{ fontFamily: "roboto-regular", fontWeight: "bold" }}>
            {finalVendorStatus ? "Completed" : "Processing"}
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
