import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/bottomTabs/homeTab/index";
import * as React from "react";
export const MainStackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
