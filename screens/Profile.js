import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import FlashMessage, { showMessage } from "react-native-flash-message";

import firebase from "../config/Firebase";
const Profile = (props) => {
  const onSignOut = async () => {
    try {
      await firebase.auth().signOut();
      props.navigation.replace("StartUp");
    } catch (err) {
      showMessage({
        message: "Error",
        description: err.message,
        type: "danger",
      });
    }
  };
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
  return (
    <View style={styles.screen}>
      <Text>Profile</Text>
      <Button
        raised={true}
        title="Sign Out"
        onPress={onSignOut}
        buttonStyle={{ width: 100 }}
      />
      <FlashMessage position="bottom" />
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

export default Profile;
