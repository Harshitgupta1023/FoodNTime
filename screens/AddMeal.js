import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import CourseType from "../components/CourseType";
import MealCategory from "../components/MealCategory";
import Icon from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";

const AddMeal = (props) => {
  const [courseType, setCourseType] = useState();
  const [isVeg, setIsVeg] = useState(false);
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [filePath, setFilePath] = useState("");

  const discountHandler = (input) => {
    setDiscount(input.replace(/[^0-9]/g, ""));
  };
  const priceHandler = (input) => {
    setPrice(input.replace(/[^0-9]/g, ""));
  };
  const timeHandler = (input) => {
    setTime(input.replace(/[^0-9]/g, ""));
  };

  const filePicker = async () => {
    let file = await ImagePicker.launchImageLibraryAsync();
    setFilePath(file.uri);
  };
  // Create the file metadata
  // var storageRef = firebase.storage().ref();
  // var metadata = {
  //   contentType: "image/jpeg",
  // };
  // const response = await fetch(file.uri);
  // const blob = await response.blob();

  // // Upload file and metadata to the object 'images/mountains.jpg'
  // var loc = "images/" + Date.now().toString() + ".jpg";
  // await storageRef.child(loc).put(blob, metadata);
  // console.log(await storageRef.child(loc).getDownloadURL());
  // storageRef.child(loc).delete();
  return (
    <View style={styles.screen}>
      <ScrollView>
        <Input
          placeholder="Enter meal name"
          // onChangeText={(eve) => setEmail(eve)}
          label="Meal Name"
        />
        <Text style={styles.text}>Course Type</Text>
        <CourseType course={courseType} setCourse={setCourseType} />
        <Text style={styles.text}>Category</Text>
        <MealCategory veg={isVeg} setVeg={setIsVeg} />
        <Input
          placeholder="Discount Value in %"
          label="Dicount"
          maxLength={2}
          value={discount}
          keyboardType="number-pad"
          onChangeText={discountHandler}
        />
        <Input
          placeholder="Price of Meal"
          label="Price"
          maxLength={3}
          value={price}
          keyboardType="number-pad"
          onChangeText={priceHandler}
        />
        <Input
          placeholder="Time"
          label="Preparation Time"
          maxLength={3}
          value={time}
          keyboardType="number-pad"
          onChangeText={timeHandler}
        />
        <View style={styles.picker}>
          <Button
            icon={<Icon name="image" size={25} color="white" />}
            raised={true}
            title="     Choose Image"
            onPress={filePicker}
          />
        </View>
        {filePath !== "" ? (
          <View style={styles.image}>
            <Image
              source={{ uri: filePath }}
              style={{ width: "100%", height: 200 }}
            />
          </View>
        ) : null}

        <View style={styles.submit}>
          <Button raised={true} title="Add Meal" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  text: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#474747",
  },
  image: {
    paddingHorizontal: "10%",
    paddingVertical: 10,
  },
  picker: {
    paddingHorizontal: "25%",
    paddingVertical: 10,
  },
  submit: {
    paddingHorizontal: "30%",
    paddingVertical: 10,
  },
});

export default AddMeal;
