import React from "react";
import { View, StyleSheet } from "react-native";
import { Screens } from "../../../themes";

const HomeScreen = () => {
  return <View style={styles.sectionContainer}></View>;
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.colors.background,
  },
});

export default HomeScreen;
