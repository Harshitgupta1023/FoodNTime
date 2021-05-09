import React from "react";
import { View, Text, StyleSheet } from "react-native";
const MealsCard = ({ meals, mealsId }) => {
  return (
    <View style={styles.screen}>
      {mealsId.map((dat) => {
        return <Text key={dat}>{dat}</Text>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default MealsCard;
