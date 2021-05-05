import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import firebase from "../config/Firebase";
const VendorAccount = (props) => {
  const onSignOut = async () => {
    await firebase.auth().signOut();
    props.navigation.replace("StartUp");
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

export default VendorAccount;
