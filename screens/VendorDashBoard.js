import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import Firebase from "../config/Firebase";
import AppLoading from "expo-app-loading";

import MealsCard from "../components/MealsCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchMealsRedux } from "../redux/actions/user";

const VendorDashBoard = (props) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const user = Firebase.auth().currentUser.uid;

  const fetchMeals = async () => {
    var storage = Firebase.storage().ref();
    var db = Firebase.firestore();
    var obj = {};
    var reduxObj = [];
    var reduxObjId = [];
    var dat = await db.collection("meals").get();
    await Promise.all(
      dat.docs.map(async (doc) => {
        reduxObjId.push(doc.id);
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
    dispatch(fetchMealsRedux(reduxObj, reduxObjId));
  };

  const meals = useSelector((state) => state.meals.filteredMeals);
  const mealsId = useSelector((state) => state.meals.filteredMealsID);

  if (loading) {
    return (
      <AppLoading
        startAsync={fetchMeals}
        onFinish={() => {
          setLoading(false);
        }}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView style={{ width: "100%" }}>
        {mealsId.map((dat) => {
          console.log();
          return meals.filter((data) => data.id === dat)[0].vendorID ===
            user ? (
            <MealsCard
              key={dat}
              mealId={dat}
              meals={meals.filter((data) => data.id === dat)[0]}
              navigation={props.navigation}
              vendor
            />
          ) : null;
        })}
      </ScrollView>
      <View style={styles.fab}>
        <FAB
          large
          icon="plus"
          onPress={() => props.navigation.navigate("Add Meal")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    paddingLeft: "70%",
    paddingVertical: 10,
  },
});

export default VendorDashBoard;
