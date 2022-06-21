import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Apptheme } from "../themes";
import { enableScreens } from "react-native-screens";
import DrawerNavigator from "../navigations/DrawerNavigator";
// Before rendering any navigation stack

export default function RootNavigator() {
  enableScreens();

  return (
    <NavigationContainer theme={Apptheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
