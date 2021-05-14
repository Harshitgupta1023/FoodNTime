import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Input } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import Firebase from "../config/Firebase";
const PasswordProfile = (props) => {
  const [newPassword, setPasswrod] = useState("");
  const [confirmPassword, setConfirmPasswrod] = useState("");
  const handlePassword = async () => {
    if (newPassword !== confirmPassword) {
      showMessage({
        message: "ERROR",
        description: "PASSWORD not matching!!!!",
        type: "danger",
      });
    } else {
      var db = Firebase.auth().currentUser;
      try {
        await db.updatePassword(newPassword);
        showMessage({
          message: "SUCCESS!!!!",
          description: "Password Updated",
          type: "success",
        });
      } catch (err) {
        showMessage({
          message: "ERROR",
          description: err.message,
          type: "danger",
        });
      }
    }
  };
  return (
    <View style={styles.screen}>
      <Text
        style={{
          fontFamily: "roboto-regular",
          fontSize: 25,
          marginTop: 20,
        }}
      >
        PASSWORD
      </Text>
      <View style={styles.passwordContainer}>
        <Input
          placeholder=" Password"
          secureTextEntry={true}
          onChangeText={(eve) => setPasswrod(eve)}
          label="New Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          value={newPassword}
          errorStyle={{ color: "red" }}
        />
        <Input
          placeholder=" Password"
          secureTextEntry={true}
          onChangeText={(eve) => setConfirmPasswrod(eve)}
          label="Confirm Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          value={confirmPassword}
          errorStyle={{ color: "red" }}
        />
        <Button
          raised={true}
          title="Submit"
          onPress={handlePassword}
          buttonStyle={{ width: 100 }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          raised={true}
          title="Back"
          onPress={() => {
            props.navigation.pop();
          }}
          buttonStyle={{ width: 100 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  passwordContainer: {
    padding: 20,
    marginBottom: 10,
    width: "90%",
    elevation: 5,
    borderWidth: 0.1,
    marginTop: 10,
  },
  buttonContainer: {
    width: "50%",
    marginTop: 20,
  },
});

export default PasswordProfile;
