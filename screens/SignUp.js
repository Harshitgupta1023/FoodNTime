import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import NewInputText from "../components/NewInputText";
import firebase from "../config/Firebase";

const SignUpScreen = (props) => {
  const [email, setEmail] = useState("asd");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async () => {
    console.log(email, password);
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    var user = firebase.auth().currentUser;
    console.log(user);
  };

  return (
    <View style={styles.screen}>
      <View></View>
      <View style={styles.inputcontainer}>
        <Text>UserName </Text>
        <NewInputText
          onChangeText={(eve) => setUsername(eve)}
          value={username}
        />
        <Text>Email </Text>
        <NewInputText onChangeText={(eve) => setEmail(eve)} value={email} />
        <Text> Password </Text>
        <NewInputText
          onChangeText={(eve) => setPassword(eve)}
          value={password}
        />
      </View>
      <Button title="SUBMIT" onPress={onSignUp} />
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
export default SignUpScreen;
