import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch, Platform, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonss from "../components/HeaderButtonss";

import Colors from "../constants/colors";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text style={{ fontFamily: "roboto-light" }}>{props.label}</Text>
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
  const [isDessert, setIsDessert] = useState(false);
  const [isStarter, setIsStarter] = useState(false);
  const [isMainCourse, setIsMainCourse] = useState(false);
  const [isNonVeg, setIsNonVeg] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const saveFilters = useCallback(() => {
    const appliedFilter = {
      dessert: isDessert,
      starter: isStarter,
      mainCOurse: isMainCourse,
      nonVeg: isNonVeg,
      vegetarian: isVegetarian,
    };
    return appliedFilter;
  }, [isNonVeg, isVegetarian, isDessert, isStarter, isMainCourse]);

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
      <FilterSwitch
        label="Dessert"
        state={isDessert}
        onChange={(newVal) => setIsDessert(newVal)}
      />
      <FilterSwitch
        label="Starter"
        state={isStarter}
        onChange={(newVal) => setIsStarter(newVal)}
      />
      <FilterSwitch
        label="Main-Course"
        state={isMainCourse}
        onChange={(newVal) => setIsMainCourse(newVal)}
      />
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
    alignItems: "center",
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
