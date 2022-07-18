import { StackActions } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../hooks/hooks";

interface ILoadingScreen {
  navigation: any;
}

const LoadingScreen = ({ navigation }: ILoadingScreen) => {
  const isAlreadyLoggedIn = useAppSelector((state) => state?.contract);
  console.log("isAlreadyLoggedIn", isAlreadyLoggedIn);
  useEffect(() => {
    if (isAlreadyLoggedIn?.responseData) {
      navigation.dispatch(StackActions.replace("DrawerNavigator"));
    } else {
      navigation.dispatch(StackActions.replace("AuthStack"));
    }
  }, [isAlreadyLoggedIn]);
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default LoadingScreen;
