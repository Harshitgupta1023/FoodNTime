import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonss from "../components/HeaderButtonss";
import CourseType from "../components/CourseType";
import MealCategory from "../components/MealCategory";

const Filters = (props) => {
  const [courseType, setCourseType] = useState(
    Math.floor(Math.random() * 3) + 1
  );
  const [isNonVeg, setIsNonVeg] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilter = {
      course:
        courseType === 1
          ? "starter"
          : courseType === 2
          ? "mainCourse"
          : courseType === 3
          ? "dessert"
          : null,
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
      <View>
        <Text style={styles.text}>Category</Text>
        <MealCategory
          newStyle={{ paddingVertical: 0, paddingTop: 20 }}
          veg={isNonVeg}
          setVeg={setIsNonVeg}
          word="Non-Vegetarian"
        />
        <MealCategory
          newStyle={{ paddingVertical: 0, paddingTop: 10 }}
          veg={isVegetarian}
          setVeg={setIsVegetarian}
          word="Vegetarian"
        />
      </View>
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
});
export default Filters;
