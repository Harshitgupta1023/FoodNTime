import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Firebase from "../config/Firebase";
import AppLoading from "expo-app-loading";

import MealsCard from "../components/MealsCard";
import { ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchMealsRedux } from "../redux/actions/user";

const HomePage = (props) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

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
          var vendorId = doc.data().vendorID;
          var vendorData = await Firebase.firestore()
            .collection("vendors")
            .doc(vendorId)
            .get();

          reduxObj.push({
            id: doc.id,
            ...obj[doc.id],
            storeAddress: vendorData.data().address,
            vendorName: vendorData.data().name,
          });
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
  if (meals.length === 0) {
    return (
      <View style={styles.screen}>
        <Text>No Meals Found !!! Check Your Filters ...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView style={{ width: "100%" }}>
        {mealsId.map((dat) => {
          return (
            <MealsCard
              key={dat}
              mealId={dat}
              meals={meals.filter((data) => data.id === dat)[0]}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomePage;
