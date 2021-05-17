import React, { Fragment, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";

import firebase from "firebase";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import Firebase from "../config/Firebase";
import LoginValidator from "../validator/LoginValidator";
import { ScrollView } from "react-native";

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  var db = Firebase.firestore();
  const onLogIn = async (email, password) => {
    setIsLoading(true);
    try {
      await Firebase.auth().setPersistence(
        firebase.auth.Auth.Persistence.LOCAL
      );
      await Firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      showMessage({
        message: "Login Error",
        description: err.message,
        type: "danger",
      });
    }

    setIsLoading(false);
  };
  const onGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await Firebase.auth().setPersistence(
        firebase.auth.Auth.Persistence.LOCAL
      );
      GoogleSignin.configure({
        offlineAccess: true,
        webClientId: process.env.GOOGLE_OAUTH_ID_WEB,
        androidClientId: process.env.GOOGLE_OAUTH_ID_ANDROID,
        scopes: ["profile", "email"],
      });
      await GoogleSignin.hasPlayServices();
      const googleUser = await GoogleSignin.signIn();
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken
      );

      // Sign in with credential from the Google user.
      await firebase.auth().signInWithCredential(credential);
      var user = Firebase.auth().currentUser;
      var db = Firebase.firestore();
      var userDB = await db.collection("users").doc(user.uid).get();
      userDB = userDB.data();
      if (!userDB) {
        await Firebase.auth().currentUser.updateProfile({
          photoURL: "images/blankProfile.png",
        });
        await db
          .collection("users")
          .doc(user.uid)
          .set({ cart: [], orders: [], rating: 5 });
        console.log("Data Writen successfully");
      }
      setIsLoading(false);
    } catch (err) {
      showMessage({
        message: "Login Error",
        description: err.message,
        type: "danger",
      });
      setIsLoading(false);
    }
  };

  const onForgotPassword = () => {
    props.navigation.navigate("Forgot Password");
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            onLogIn(values.email, values.password);
          }}
          validationSchema={LoginValidator}
        >
          {({
            values,
            errors,
            handleChange,
            touched,
            handleBlur,
            handleSubmit,
          }) => (
            <Fragment>
              <View style={styles.inputcontainer}>
                <Input
                  placeholder="email@address.com"
                  onChangeText={handleChange("email")}
                  label="Email Address"
                  leftIcon={{ type: "materials-icons", name: "mail" }}
                  value={values.email}
                  onBlur={handleBlur("email")}
                  errorStyle={{ color: "red" }}
                  errorMessage={touched.email && errors.email}
                />
                <Input
                  placeholder=" Password"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  label="Password"
                  leftIcon={{ type: "font-awesome", name: "lock" }}
                  value={values.password}
                  onBlur={handleBlur("password")}
                  errorStyle={{ color: "red" }}
                  errorMessage={touched.password && errors.password}
                />
              </View>
              <View style={styles.button}>
                <Button
                  raised={true}
                  title="Log In"
                  onPress={handleSubmit}
                  buttonStyle={{ width: 140 }}
                />
                <Button
                  raised={true}
                  title="Forgot Password"
                  onPress={onForgotPassword}
                  buttonStyle={{ width: 140 }}
                />
              </View>
              <ActivityIndicator
                animating={isLoading}
                size="large"
                color={Colors.red800}
              />
            </Fragment>
          )}
        </Formik>
        <View style={styles.button}>
          <GoogleSigninButton
            style={{ width: 200, height: 50 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={onGoogleLogin}
          />
        </View>
      </ScrollView>
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
    width: "100%",
  },
  scroll: { flex: 1, paddingTop: 70 },
  button: {
    width: 330,
    marginTop: 30,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
export default LoginScreen;
