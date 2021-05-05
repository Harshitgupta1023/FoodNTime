import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, CheckBox } from "react-native-elements";
import firebase from "../config/Firebase";

const SignUpScreen = (props) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isVendor, setIsVendor] = useState(true);

  const onSignUp = async () => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    var user = firebase.auth().currentUser;
    if (user) {
      await user.updateProfile({
        displayName: fullName,
      });
      db.collection("users")
        .doc(user.uid)
        .set({ cart: [], orders: [], rating: 5 })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      props.navigation.replace("Food N Time");
    }
  };

  return (
    <View style={styles.container}>
      <CheckBox
        right={true}
        iconRight={true}
        title="Vendor"
        checked={isVendor}
        onPress={() => {
          setIsVendor((vendor) => !vendor);
        }}
      />
      <View style={styles.screen}>
        <View style={styles.inputcontainer}>
          {isVendor ? null : (
            <Input
              placeholder="Enter your Name"
              onChangeText={(eve) => setFullName(eve)}
              value={fullName}
              label="Full Name"
              leftIcon={{ type: "entypo", name: "user" }}
            />
          )}
          {isVendor ? (
            <Input
              placeholder="Enter Store Name"
              onChangeText={(eve) => setStoreName(eve)}
              value={storeName}
              label="Store Name"
              leftIcon={{ type: "FontAwesome5", name: "store" }}
            />
          ) : null}
          {isVendor ? (
            <Input
              placeholder="Enter Store Address"
              onChangeText={(eve) => setStoreAddress(eve)}
              value={storeAddress}
              label="Store Address"
              leftIcon={{ type: "entypo", name: "location" }}
            />
          ) : null}
          <Input
            placeholder="email@address.com"
            onChangeText={(eve) => setEmail(eve)}
            value={email}
            label="Email Address"
            leftIcon={{ type: "materials-icons", name: "mail" }}
          />
          <Input
            placeholder=" Password"
            secureTextEntry={true}
            value={password}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
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