import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";
import Firebase from "../config/Firebase";
import AppLoading from "expo-app-loading";
import RenderImage from "../components/RenderImage";
import MealsCard from "../components/MealsCard";
const HomePage = (props) => {
  const [meals, setMeals] = useState();
  const [mealsId, setMealsId] = useState();
  const [imageId, setImageId] = useState();

  const fetchMeals = async () => {
    var obj = {};
    var objId = [];

    var i = 0;
    await Firebase.firestore()
      .collection("meals")
      .get()
      .then(async (querySnapshot) => {
        querySnapshot.forEach((doc, idx) => {
          obj[doc.id] = doc.data();
          objId[i] = doc.id;
          i += 1;
        });
        setMeals(obj);
        setMealsId(objId);
      });
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if (mealsId === undefined) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  // if (imageId === undefined) {
  //   return (
  //     <View>
  //       <Text>Loading</Text>
  //       <RenderImage mealsId={mealsId} meals={meals} setImageId={setImageId} />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.screen}>
      <MealsCard meals={meals} mealsId={mealsId} />

      {/* <Image style={styles.tinyLogo} source={{ uri: imageId[1].ImageUrl }} /> */}

      <Button
        title="click"
        onPress={() => {
          console.log(meals[mealsId[6]]);
        }}
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
