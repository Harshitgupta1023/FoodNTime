import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Firebase from "../config/Firebase";
import AppLoading from "expo-app-loading";

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
    console.log(obj);
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
      {/* <MealsCard meals={meals} mealsId={mealsId} /> */}
      <Text>{meals[mealsId[0]].imageURL}</Text>
      <Image
        style={styles.tinyLogo}
        source={{ uri: meals[mealsId[0]].imageURL }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tinyLogo: {
    width: 150,
    height: 150,
  },
});

export default HomePage;
