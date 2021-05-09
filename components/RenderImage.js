import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import Firebase from "../config/Firebase";

const RenderImage = (props) => {
  const [imageArray, setImageArray] = useState(false);

  const imageStorage = Firebase.storage().ref();
  var i = 0;
  const fetchImages = async () => {
    var obj = {};
    await props.mealsId.map((dat) => {
      dat === "mHTHDytwnJZSkjxA59cO"
        ? null
        : imageStorage
            .child(props.meals[dat].imageURL)
            .getDownloadURL()
            .then((url) => {
              obj[dat] = url;
            });
    });
    props.setImageId(obj);
    setImageArray(true);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (!imageArray) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Hello</Text>
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

export default RenderImage;
