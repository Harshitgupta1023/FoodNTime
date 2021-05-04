import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import firebase from "../config/Firebase";
const Profile = (props) => {
  const onSignOut = async () => {
    await firebase.auth().signOut();
    props.navigation.replace("StartUp");
  };
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

export default Profile;
