import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch, Platform, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonss from "../components/HeaderButtonss";
import CourseType from "../components/CourseType";
import Colors from "../constants/colors";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.text}>{props.label}</Text>
      <Switch
        trackColor={{ false: "grey", true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const Filters = (props) => {
  const [courseType, setCourseType] = useState();
  const [isNonVeg, setIsNonVeg] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilter = {
      course:
        courseType === 1
          ? "starter"
          : courseType === 2
          ? "mainCourse"
          : "dessert",
      nonVeg: isNonVeg,
      vegetarian: isVegetarian,
    };
    return appliedFilter;
  }, [isNonVeg, isVegetarian, courseType]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButtonss}>
          <Item
            title="Save"
            iconName="save"
            onPress={() => {
              console.log(props.route.params);
            }}
          />
        </HeaderButtons>
      ),
    });
  });

  useEffect(() => {
    props.navigation.setParams({ save: saveFilters() });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filter/ Restrictions </Text>
      <View>
        <Text style={styles.text}>Course</Text>
        <CourseType
          course={courseType}
          setCourse={setCourseType}
          screenStyle={{ flex: 0 }}
        />
      </View>
      <FilterSwitch
        label="Non-Veg"
        state={isNonVeg}
        onChange={(newVal) => setIsNonVeg(newVal)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={(newVal) => setIsVegetarian(newVal)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 15,
  },
  text: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#474747",
  },
  title: {
    fontFamily: "roboto-regular",
    fontWeight: "bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
});
export default Filters;
