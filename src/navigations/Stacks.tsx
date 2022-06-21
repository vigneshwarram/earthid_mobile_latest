import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/bottomTabs/homeTab/index";
import DocumentScreen from "../screens/bottomTabs/documentTab";
import * as React from "react";
const Stack = createStackNavigator();
export const HomeScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
export const DocumentScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DocumentScreen" component={DocumentScreen} />
    </Stack.Navigator>
  );
};
