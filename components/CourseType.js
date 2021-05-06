import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { RadioButton } from "react-native-paper";
const CourseType = (props) => {
  const { course, setCourse } = props;

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Text style={styles.text}>Starter</Text>
        <RadioButton
          status={course == 1 ? "checked" : "unchecked"}
          onPress={() => setCourse(1)}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Main Course</Text>
        <RadioButton
          status={course == 2 ? "checked" : "unchecked"}
          onPress={() => setCourse(2)}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Dessert</Text>
        <RadioButton
          status={course == 3 ? "checked" : "unchecked"}
          onPress={() => setCourse(3)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  screen: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  text: {
    fontSize: 16,
    color: "#565656",
  },
});

export default CourseType;
