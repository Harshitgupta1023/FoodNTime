import React, { useState } from "react";
import { ImageBackground } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";

import { ListItem, Icon, Button, Input } from "react-native-elements";

import BlankProfile from "../assets/blankProfile.jpg";

import firebase from "../config/Firebase";
import { ScrollView } from "react-native";

const Profile = (props) => {
  const user = firebase.auth().currentUser.providerData[0];

  const [name, setName] = useState(user.displayName);
  const [eMail, seteMail] = useState(user.email);

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
  const handleName = async () => {
    if (name.length <= 5) {
      showMessage({
        message: "ERROR",
        description: "Name length is less than 5!!!!",
        type: "danger",
      });
    } else {
      var db = firebase.auth().currentUser;
      try {
        await db.updateProfile({
          displayName: name,
        });
        showMessage({
          message: "Name Updated",
          description: "Name is changed!!!!",
          type: "success",
        });
      } catch (err) {
        showMessage({
          message: "ERROR",
          description: err,
          type: "danger",
        });
      }
    }
  };
  const handleEmail = () => {
    console.log(eMail);
  };
  const list = [
    {
      name: "NAME",
      realText: user.displayName,
      icon: "person-outline",
      type: "ionicon",
      changeText: (eve) => setName(eve),
      function: handleName,
    },
    {
      name: "E-Mail",
      realText: user.email,
      icon: "mail-open-outline",
      type: "ionicon",
      changeText: (eve) => seteMail(eve),
      function: handleEmail,
    },
  ];

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.imageContainer}>
          <ImageBackground source={BlankProfile} style={styles.image} />
          <View
            style={{
              top: 145,
              left: -50,
              elevation: 5,
            }}
          >
            <Icon
              name="camera"
              type="ionicon"
              size={26}
              raised
              onPress={() => {
                console.log("IMAGE");
              }}
            />
          </View>
        </View>
        <View style={styles.listContainer}>
          {list.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <Icon name={l.icon} type={l.type} style={{ marginLeft: 20 }} />
              <ListItem.Content style={{ marginLeft: 20 }}>
                {l.name !== "E-Mail" ? (
                  <View style={{ width: "95%" }}>
                    <Input
                      placeholder={l.name}
                      onChangeText={l.changeText}
                      label={l.realText}
                      errorStyle={{ color: "red" }}
                    />
                  </View>
                ) : (
                  <View style={{ width: "95%" }}>
                    <ListItem.Title
                      style={{ fontSize: 17, fontFamily: "roboto-light" }}
                    >
                      {l.name} :
                    </ListItem.Title>
                    <Text
                      numberOfLines={2}
                      style={{ fontSize: 18, fontFamily: "roboto-regular" }}
                    >
                      {l.realText}
                    </Text>
                  </View>
                )}
              </ListItem.Content>
              {l.name !== "E-Mail" ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Icon
                    name="create-outline"
                    type="ionicon"
                    onPress={l.function}
                  />
                  <Text>Update</Text>
                </View>
              ) : null}
            </ListItem>
          ))}
        </View>
        <View style={{ padding: 10, marginBottom: 10 }}>
          <Button
            raised={true}
            title="Sign Out"
            onPress={onSignOut}
            buttonStyle={{ width: 100 }}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Button
            raised={true}
            title="Update Password"
            onPress={() => {
              props.navigation.navigate("Passwordprofile");
            }}
            buttonStyle={{ width: 175 }}
          />
        </View>
        <FlashMessage position="bottom" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
  },
  image: {
    marginLeft: 70,
    width: 200,
    height: 200,
    borderRadius: 40,
    overflow: "hidden",
    elevation: 5,
  },
  listContainer: {
    margin: 10,
    width: "95%",
  },
});

export default Profile;
