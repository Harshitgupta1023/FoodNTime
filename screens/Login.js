import React, { Fragment, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";

import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import Firebase from "../config/Firebase";
import LoginValidator from "../validator/LoginValidator";
import { ScrollView } from "react-native";

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  var db = Firebase.firestore();
  const onLogIn = async (email, password) => {
    setIsLoading(true);
    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password);
      var user = Firebase.auth().currentUser;
      if (user) {
        await db
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              props.navigation.replace("Food N Time");
            } else {
              // doc.data() will be undefined in this case
              props.navigation.replace("Vendor Dashboard");
            }
          });
      }
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
    const isUserEqual = (googleUser, firebaseUser) => {
      if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
          if (
            providerData[i].providerId ===
              firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.user.id
          ) {
            // We don't need to reauth the Firebase connection.
            return true;
          }
        }
      }
      return false;
    };
    const onSignIn = (googleUser) => {
      // We need to register an Observer on Firebase Auth to make sure auth is initialized.
      var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken
          );

          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then((res) => {
              props.navigation.replace("Food N Time");
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
          props.navigation.replace("Food N Time");
        }
      });
    };
    try {
      const googleUser = await Google.logInAsync({
        androidClientId: process.env.GOOGLE_CLIENT_ID,
      });
      if (googleUser.type === "success") {
        onSignIn(googleUser);
      } else {
        showMessage({
          message: "Login Error",
          description: "Some Error Occurred",
          type: "danger",
        });
      }
    } catch (err) {
      showMessage({
        message: "Login Error",
        description: err.message,
        type: "danger",
      });
    }
    setIsLoading(false);
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
          <Button
            icon={<Icon name="google" size={25} color="white" />}
            raised={true}
            title="     SignIn with Google"
            onPress={onGoogleLogin}
            buttonStyle={{
              width: 300,
              backgroundColor: "red",
              borderRadius: 30,
            }}
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
