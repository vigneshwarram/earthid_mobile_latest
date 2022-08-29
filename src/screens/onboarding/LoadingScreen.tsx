import { StackActions } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
} from "react-native";
import { useAppSelector } from "../../hooks/hooks";

interface ILoadingScreen {
  navigation: any;
}

const LoadingScreen = ({ navigation }: ILoadingScreen) => {
  const isAlreadyLoggedIn = useAppSelector((state) => state?.contract);

  const checkAuth = async () => {
    const getItem = await AsyncStorage.getItem("passcode");
    console.log("getItem", getItem);
    if (getItem) {
      navigation.dispatch(StackActions.replace("PasswordCheck"));
    } else {
      navigation.dispatch(StackActions.replace("AuthStack"));
    }
  };
  console.log("isAlreadyLoggedIn", isAlreadyLoggedIn);
  useEffect(() => {
    if (isAlreadyLoggedIn?.responseData) {
      checkAuth();
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
