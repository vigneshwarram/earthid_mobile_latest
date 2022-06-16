import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Apptheme } from "../themes";
import { BottomMenus } from "../navigations/BottomTabs";
import { enableScreens } from "react-native-screens";
// Before rendering any navigation stack

export default function App() {
  const Stack = createStackNavigator();
  enableScreens();
  const authenticatedStack = {
    bottomTabs: BottomMenus,
  };

  function AuthStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {Object.entries({
          ...authenticatedStack,
        }).map(([name, component]: any) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer theme={Apptheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"AuthStack"} component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
