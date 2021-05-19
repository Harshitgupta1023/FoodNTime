import React, { useState, Fragment } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Input, Button, CheckBox } from "react-native-elements";
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";

import Firebase from "../config/Firebase";
import { ActivityIndicator, Colors } from "react-native-paper";
import {
  VendorSignUpValidator,
  UserSignUpValidator,
} from "../validator/SignUpValidator";

const SignUpScreen = (props) => {
  var db = Firebase.firestore();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isVendor, setIsVendor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSignUp = async () => {
    setIsLoading(true);
    try {
      if (!isVendor) {
        await Firebase.auth().createUserWithEmailAndPassword(email, password);
        var user = Firebase.auth().currentUser;
        if (user) {
          await user.updateProfile({
            displayName: fullName,
          });
          db.collection("users")
            .doc(user.uid)
            .set({
              name: fullName,
              email: email,
              cart: [],
              orders: [],
              rating: 5,
            })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }
      } else {
        await Firebase.auth().createUserWithEmailAndPassword(email, password);
        var store = Firebase.auth().currentUser;
        if (store) {
          await store.updateProfile({
            displayName: storeName,
          });
          db.collection("vendors")
            .doc(store.uid)
            .set({
              name: storeName,
              email: email,
              rating: [],
              orders: [],
              address: storeAddress,
            })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }
      }
    } catch (err) {
      showMessage({
        message: "SignUp Error",
        description: err.message,
        type: "danger",
      });
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <CheckBox
        right={true}
        iconRight={true}
        title="Vendor"
        checked={isVendor}
        onPress={() => {
          setIsVendor((vendor) => !vendor);
        }}
      />
      <ScrollView>
        <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
            storeName: "",
            storeAddress: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            setStoreName(values.storeName);
            setStoreAddress(values.storeAddress);
            setFullName(values.name);
            setEmail(values.email);
            setPassword(values.password);
            onSignUp();
          }}
          validationSchema={
            isVendor ? VendorSignUpValidator : UserSignUpValidator
          }
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
              <View style={styles.screen}>
                <View style={styles.inputcontainer}>
                  {isVendor ? null : (
                    <Input
                      placeholder="Enter your Name"
                      onChangeText={handleChange("name")}
                      value={values.name}
                      label="Full Name"
                      leftIcon={{ type: "entypo", name: "user" }}
                      onBlur={handleBlur("name")}
                      errorStyle={{ color: "red" }}
                      errorMessage={touched.name && errors.name}
                    />
                  )}
                  {isVendor ? (
                    <Input
                      placeholder="Enter Store Name"
                      onChangeText={handleChange("storeName")}
                      value={values.storeName}
                      label="Store Name"
                      leftIcon={{ type: "FontAwesome5", name: "store" }}
                      onBlur={handleBlur("storeName")}
                      errorStyle={{ color: "red" }}
                      errorMessage={touched.storeName && errors.storeName}
                    />
                  ) : null}
                  {isVendor ? (
                    <Input
                      placeholder="Enter Store Address"
                      onChangeText={handleChange("storeAddress")}
                      value={values.storeAddress}
                      label="Store Address"
                      leftIcon={{ type: "entypo", name: "location" }}
                      onBlur={handleBlur("storeAddress")}
                      errorStyle={{ color: "red" }}
                      errorMessage={touched.storeAddress && errors.storeAddress}
                    />
                  ) : null}
                  <Input
                    placeholder="email@address.com"
                    onChangeText={handleChange("email")}
                    value={values.email}
                    label="Email Address"
                    leftIcon={{ type: "materials-icons", name: "mail" }}
                    onBlur={handleBlur("email")}
                    errorStyle={{ color: "red" }}
                    errorMessage={touched.email && errors.email}
                  />
                  <Input
                    placeholder=" Password"
                    secureTextEntry={true}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    label="Password"
                    leftIcon={{ type: "font-awesome", name: "lock" }}
                    onBlur={handleBlur("password")}
                    errorStyle={{ color: "red" }}
                    errorMessage={touched.password && errors.password}
                  />
                  <Input
                    placeholder=" Confirm Password"
                    secureTextEntry={true}
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    label="Confirm Password"
                    leftIcon={{ type: "font-awesome", name: "lock" }}
                    onBlur={handleBlur("confirmPassword")}
                    errorStyle={{ color: "red" }}
                    errorMessage={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  />
                </View>
                <View style={{ padding: 10 }}>
                  <Button
                    raised={true}
                    title="Sign Up"
                    onPress={handleSubmit}
                    buttonStyle={{ width: 100 }}
                  />
                </View>
              </View>
            </Fragment>
          )}
        </Formik>
        <ActivityIndicator
          animating={isLoading}
          size="large"
          color={Colors.red800}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputcontainer: {
    width: "80%",
  },
});
export default SignUpScreen;
