import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import NewInputText from "../components/NewInputText";
import firebase from "../config/Firebase";
import * as ImagePicker from "expo-image-picker";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogIn = async () => {
    console.log(email, password);
    // await firebase.auth().signInWithEmailAndPassword(email, password);
    // var user = firebase.auth().currentUser;
    // console.log(user);
    // await user.updateProfile({
    //   displayName: "Gourav Kumar",
    // });
    // console.log(user);
    // Create the file metadata
    let file = await ImagePicker.launchImageLibraryAsync();
    var storageRef = firebase.storage().ref();
    var metadata = {
      contentType: "image/jpeg",
    };
    const response = await fetch(file.uri);
    const blob = await response.blob();

    // Upload file and metadata to the object 'images/mountains.jpg'
    var loc = "images/" + Date.now().toString() + ".jpg";
    await storageRef.child(loc).put(blob, metadata);
    console.log(await storageRef.child(loc).getDownloadURL());
    storageRef.child(loc).delete();
  };
  return (
    <View style={styles.screen}>
      <View></View>
      <View style={styles.inputcontainer}>
        <Text>Email Address </Text>
        <NewInputText onChangeText={(eve) => setEmail(eve)} value={email} />
        <Text>Password </Text>
        <NewInputText
          onChangeText={(eve) => setPassword(eve)}
          value={password}
        />
      </View>
      <Button title="SUBMIT" onPress={onLogIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputcontainer: {
    width: "80%",
  },
});
export default LoginScreen;
