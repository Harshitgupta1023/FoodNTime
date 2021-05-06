import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import Firebase from "../config/Firebase";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const onSubmit = async () => {
    var re = /^[^\s@]+@[^\s@]+$/;
    if (re.test(email)) {
      try {
        await Firebase.auth().sendPasswordResetEmail(email);
        showMessage({
          message: "Email Sent",
          description: "Check your email for further Instructions",
          type: "success",
        });
        setTimeout(() => {
          props.navigation.pop();
        }, 10000);
      } catch (error) {
        showMessage({
          message: "Error",
          description: error.msg,
          type: "danger",
        });
      }
    } else {
      showMessage({
        message: "Error",
        description: "Not a valid Email Address",
        type: "danger",
      });
    }
  };
  return (
    <View style={styles.screen}>
      <View style={{ padding: "10%", width: "100%" }}>
        <Input
          placeholder="email@address.com"
          onChangeText={(eve) => setEmail(eve)}
          label="Email Address"
          leftIcon={{ type: "materials-icons", name: "mail" }}
          value={email}
        />
      </View>
      <Button
        raised={true}
        title="Submit"
        onPress={onSubmit}
        buttonStyle={{ width: 140 }}
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
});

export default ForgotPassword;
