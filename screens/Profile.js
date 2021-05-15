import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import * as ImagePicker from "expo-image-picker";

import { ListItem, Icon, Button, Input, Image } from "react-native-elements";

import Firebase from "../config/Firebase";
import { ScrollView } from "react-native";
import greenTick from "../assets/greenTick.jpg";
import redTick from "../assets/redTick.png";

const makeID = (length) => {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

const Profile = (props) => {
  const user = Firebase.auth().currentUser.providerData[0];

  const [name, setName] = useState(user.displayName);
  const [eMail, seteMail] = useState(user.email);
  const [filePath, setFilePath] = useState();
  useEffect(() => {
    const func = async () => {
      var storage = Firebase.storage().ref();
      var newPath = user.photoURL
        ? await storage.child(user.photoURL).getDownloadURL()
        : await storage.child("images/blankProfile.jpg").getDownloadURL();
      setFilePath(newPath);
    };
    func();
  }, []);

  const filePicker = async () => {
    let file = await ImagePicker.launchImageLibraryAsync();
    setFilePath(file.uri);
  };

  const onSignOut = async () => {
    try {
      await Firebase.auth().signOut();
      props.navigation.replace("Authentication");
    } catch (err) {
      showMessage({
        message: "Error",
        description: err.message,
        type: "danger",
      });
    }
  };
  const handleName = async () => {
    if (name.length <= 5) {
      showMessage({
        message: "ERROR",
        description: "Name length is less than 5!!!!",
        type: "danger",
      });
    } else {
      var db = Firebase.auth().currentUser;
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
  const imageChange = async () => {
    try {
      await filePicker();
      if (!filePath.includes("blank")) {
        // Create the file metadata
        var storageRef = Firebase.storage().ref();
        if (user.photoURL) {
          storageRef.child(user.photoURL).delete();
        }
        var metadata = {
          contentType: "image/jpeg",
        };
        const response = await fetch(filePath);
        const blob = await response.blob();
        // Upload file and metadata to the object 'images/mountains.jpg'
        var loc = "images/" + makeID(8) + "-" + Date.now().toString() + ".jpg";
        await storageRef.child(loc).put(blob, metadata);
        await Firebase.auth().currentUser.updateProfile({ photoURL: loc });
        showMessage({
          message: "Image Updated Successfully",
          type: "success",
        });
      }
    } catch (err) {
      showMessage({
        message: "Something Went Wrong",
        description: "Try Again",
        type: "danger",
      });
    }
  };
  const list = [
    {
      name: "New Name",
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
          <ImageBackground source={{ uri: filePath }} style={styles.image}>
            <Image
              style={{
                width: 25,
                height: 25,
                left: 172,
                top: 3,
              }}
              source={
                Firebase.auth().currentUser.emailVerified ? greenTick : redTick
              }
            />
          </ImageBackground>
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
              onPress={imageChange}
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
    borderTopLeftRadius: 40,
    overflow: "hidden",
    elevation: 2,
  },
  listContainer: {
    margin: 10,
    width: "95%",
  },
});

export default Profile;
