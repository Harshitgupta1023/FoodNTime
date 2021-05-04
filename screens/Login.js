import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";

import firebase from "../config/Firebase";
// import * as ImagePicker from "expo-image-picker";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogIn = async () => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    var user = firebase.auth().currentUser;
    if (user) {
      props.navigation.replace("Food N Time");
    }

    // Create the file metadata
    // let file = await ImagePicker.launchImageLibraryAsync();
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
  };
  return (
    <View style={styles.screen}>
      <View></View>
      <View style={styles.inputcontainer}>
        <Input
          placeholder="email@address.com"
          onChangeText={(eve) => setEmail(eve)}
          label="Email Address"
          leftIcon={{ type: "materials-icons", name: "mail" }}
        />
        <Input
          placeholder=" Password"
          secureTextEntry={true}
          onChangeText={(eve) => setPassword(eve)}
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
        />
      </View>
      <Button
        raised={true}
        title="Log In"
        onPress={onLogIn}
        buttonStyle={{ width: 100 }}
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
  inputcontainer: {
    width: "80%",
  },
});
export default LoginScreen;
