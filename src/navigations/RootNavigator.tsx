import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Apptheme } from "../themes";
import { enableScreens } from "react-native-screens";
import DrawerNavigator from "../navigations/DrawerNavigator";
import { SlidAnimation } from "./SlidAnimation";
import LandingScreen from "../screens/onboarding/landingPage";
import RegisterScreen from "../screens/onboarding/register";
// Before rendering any navigation stack
const animations: any = SlidAnimation;
export default function RootNavigator() {
  enableScreens();
  const Stack = createStackNavigator();

  const beforeLoggedIn = {
    LandingScreen: LandingScreen,
    RegisterScreen: RegisterScreen,
  };

  function AuthStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {Object.entries({
          ...beforeLoggedIn,
        }).map(([name, component]) => (
          <Stack.Screen
            key={name}
            options={{
              ...animations,
            }}
            name={name}
            component={component}
          />
        ))}
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer theme={Apptheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          options={{
            ...animations,
          }}
          name={"AuthStack"}
          component={AuthStack}
        />
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
