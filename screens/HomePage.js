import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import Firebase from "../config/Firebase";

const HomePage = (props) => {
  var db = Firebase.firestore();
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState();

  const fetchMeals = async () => {
    var out = {};
    await db
      .collection("meals")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          out[doc.id] = doc.data();
          // console.log(doc.id, " => ", doc.data());
        });
      });
    setMeals(out);
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
      <Text>MEALSS</Text>
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
