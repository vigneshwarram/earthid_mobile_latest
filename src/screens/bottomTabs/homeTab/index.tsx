import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../../components/Header";
import { Screens } from "../../../themes";

const HomeScreen = () => {
  return (
    <View style={styles.sectionContainer}>
      <Header linearStyle={styles.linearStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.colors.background,
  },
  linearStyle: {
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});

export default HomeScreen;
