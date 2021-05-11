import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Firebase from "../config/Firebase";
import AppLoading from "expo-app-loading";

import MealsCard from "../components/MealsCard";
import { ScrollView } from "react-native";

const HomePage = (props) => {
  const [meals, setMeals] = useState();
  const [mealsId, setMealsId] = useState();
  const [loading, setLoading] = useState(true);

  const fetchMeals = async () => {
    var storage = Firebase.storage().ref();
    var db = Firebase.firestore();
    var obj = {};
    var objId = [];
    var dat = await db.collection("meals").get();
    await Promise.all(
      dat.docs.map(async (doc) => {
        objId.push(doc.id);
        obj[doc.id] = doc.data();
        try {
          const newURL = await storage
            .child(doc.data().imageURL)
            .getDownloadURL();
          obj[doc.id].imageURL = newURL;
        } catch (err) {}
      })
    );
    setMealsId(objId);
    setMeals(obj);
  };

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
          return (
            <MealsCard
              key={dat}
              mealId={dat}
              meals={meals[dat]}
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
