import React, { useState, useEffect, useCallback } from "react";
import { ImageBackground } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";

import { ListItem, Icon, Button, Input } from "react-native-elements";

import BlankProfile from "../assets/blankProfile.jpg";

import firebase from "../config/Firebase";
import { ScrollView } from "react-native";
import { Image } from "react-native";

import greenTick from "../assets/greenTick.png";
import redTick from "../assets/redTick.png";
import { set } from "react-native-reanimated";
const VendorAccount = (props) => {
  const db = firebase.auth().currentUser;
  const user = db.providerData[0];
  const [vendorData, setVendorData] = useState();
  const [check, setCheck] = useState(false);
  var vendor = async () => {
    const dat = await firebase
      .firestore()
      .collection("vendors")
      .doc(db.uid)
      .get();
    setVendorData(dat.data());
  };
  useEffect(() => {
    vendor();
  }, [address, name, check]);
  const [name, setName] = useState(user.displayName);
  const [address, setAdress] = useState("");
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
      var db0 = firebase.auth().currentUser;
      try {
        await db0.updateProfile({
          displayName: name,
        });
        setCheck(!check);
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

  const handleAddress = async () => {
    try {
      await firebase.firestore().collection("vendors").doc(db.uid).update({
        address: address,
      });
      setCheck(!check);

      showMessage({
        message: "Address Updated",
        description: "Address is changed!!!!",
        type: "success",
      });
    } catch (err) {
      showMessage({
        message: "ERROR",
        description: err,
        type: "danger",
      });
    }
  };
  if (vendorData === undefined) {
    return (
      <View>
        <Text>LOADING......</Text>
      </View>
    );
  } else {
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
      {
        name: "ADDRESS",
        realText: vendorData.address,
        icon: "business-outline",
        type: "ionicon",
        changeText: (eve) => setAdress(eve),
        function: handleAddress,
      },
    ];
    return (
      <ScrollView>
        <View style={styles.screen}>
          <View style={styles.imageContainer}>
            <ImageBackground source={BlankProfile} style={styles.image}>
              <Image
                style={{ width: 40, height: 45, left: 150, top: 10 }}
                source={db.emailVerified ? greenTick : redTick}
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
  }
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

export default VendorAccount;
