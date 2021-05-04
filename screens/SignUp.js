import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from "../config/Firebase";

const SignUpScreen = (props) => {
  const [email, setEmail] = useState("asd");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async () => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    var user = firebase.auth().currentUser;
    await user.updateProfile({
      displayName: fullName,
    });
    props.navigation.replace("Food N Time");
  };

  return (
    <View style={styles.screen}>
      <View></View>
      <View style={styles.inputcontainer}>
        <Input
          placeholder="Enter your Name"
          onChangeText={(eve) => setFullName(eve)}
          label="Full Name"
          leftIcon={{ type: "entypo", name: "user" }}
        />
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
        title="Sign Up"
        onPress={onSignUp}
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
export default SignUpScreen;
