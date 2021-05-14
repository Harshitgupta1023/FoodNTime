import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CourseType from "../components/CourseType";
import MealCategory from "../components/MealCategory";

import { useDispatch } from "react-redux";
import { setFilters } from "../redux/actions/user";
const Filters = (props) => {
  const [courseType, setCourseType] = useState(0);
  const [isNonVeg, setIsNonVeg] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const dispatch = useDispatch();
  const saveFilters = useCallback(() => {
    const appliedFilter = {
      none: courseType === 0,
      starter: courseType === 1,
      mainCourse: courseType === 2,
      dessert: courseType === 3,
      nonVeg: isNonVeg,
      vegetarian: isVegetarian,
    };
    dispatch(setFilters(appliedFilter));
    return appliedFilter;
  }, [isNonVeg, isVegetarian, courseType, dispatch]);

  useEffect(() => {
    props.navigation.setParams({ save: saveFilters() });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Search Filters</Text>
      <View>
        <Text style={styles.text}>Course</Text>
        <CourseType
          course={courseType}
          setCourse={setCourseType}
          extra={true}
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
