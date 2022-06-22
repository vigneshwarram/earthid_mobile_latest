import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Apptheme } from "../themes";
import { enableScreens } from "react-native-screens";
import DrawerNavigator from "../navigations/DrawerNavigator";
import { SlidAnimation } from "./SlidAnimation";
// Before rendering any navigation stack
const animations: any = SlidAnimation;
export default function RootNavigator() {
  enableScreens();
  const Stack = createStackNavigator();
  return (
    <NavigationContainer theme={Apptheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          options={{
            ...animations,
          }}
          name={"DrawerNavigator"}
          component={DrawerNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
