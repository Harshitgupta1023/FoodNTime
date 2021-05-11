import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import CourseType from "../components/CourseType";
import MealCategory from "../components/MealCategory";
import Icon from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import Firebase from "../config/Firebase";
import { ActivityIndicator } from "react-native-paper";

const makeID = (length) => {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

const AddMeal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [courseType, setCourseType] = useState();
  const [name, setName] = useState("");
  const [isVeg, setIsVeg] = useState(false);
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [filePath, setFilePath] = useState("");

  var db = Firebase.firestore();

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

  const onSubmit = async () => {
    setIsLoading(true);
    // Create the file metadata
    var storageRef = Firebase.storage().ref();
    var metadata = {
      contentType: "image/jpeg",
    };
    const response = await fetch(filePath);
    const blob = await response.blob();
    // Upload file and metadata to the object 'images/mountains.jpg'
    var loc = "meals/" + makeID(8) + "-" + Date.now().toString() + ".jpg";
    await storageRef.child(loc).put(blob, metadata);
    // create doc to be inserted
    var doc = {
      imageURL: loc,
      name: name,
      price: parseInt(price),
      discount: parseInt(discount),
      starter: false,
      dessert: false,
      mainCourse: false,
      vegetarian: false,
      nonVeg: true,
      vendorID: Firebase.auth().currentUser.uid,
    };
    if (courseType === 1) {
      doc.starter = true;
    } else if (courseType == 2) {
      doc.mainCourse = true;
    } else if (courseType == 3) {
      doc.dessert = true;
    }
    if (isVeg) {
      doc.vegetarian = true;
      doc.nonVeg = false;
    }
    // Writing the doc to FireStore
    db.collection("meals")
      .doc(makeID(16))
      .set(doc)
      .then(() => {
        console.log("Document successfully written!");
        props.navigation.pop();
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        setIsLoading(false);
      });
    // console.log(await storageRef.child(loc).getDownloadURL());
    // storageRef.child(loc).delete();
  };
  return (
    <View style={styles.screen}>
      <ScrollView>
        <Input
          placeholder="Enter meal name"
          onChangeText={(eve) => setName(eve)}
          value={name}
          label="Meal Name"
        />
        <Text style={styles.text}>Course Type</Text>
        <CourseType course={courseType} setCourse={setCourseType} />
        <Text style={styles.text}>Category</Text>
        <MealCategory veg={isVeg} setVeg={setIsVeg} word="Vegetarian" />
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
        <ActivityIndicator animating={isLoading} size="large" color="blue" />
        <View style={styles.submit}>
          <Button raised={true} title="Add Meal" onPress={onSubmit} />
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
