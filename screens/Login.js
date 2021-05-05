import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import Firebase from "../config/Firebase";
// import * as ImagePicker from "expo-image-picker";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var db = Firebase.firestore();
  const onLogIn = async () => {
    await Firebase.auth().signInWithEmailAndPassword(email, password);
    var user = Firebase.auth().currentUser;
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
  const onGoogleLogin = async () => {
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
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.screen}>
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
      <View style={styles.button}>
        <Button
          raised={true}
          title="Log In"
          onPress={onLogIn}
          buttonStyle={{ width: 100 }}
        />
      </View>
      <View style={styles.button}>
        <Button
          icon={<Icon name="google" size={25} color="white" />}
          raised={true}
          title="     SignIn with Google"
          onPress={onGoogleLogin}
          buttonStyle={{
            width: 200,
            backgroundColor: "red",
            borderRadius: 30,
          }}
        />
      </View>
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
  button: {
    marginVertical: 10,
  },
});
export default LoginScreen;