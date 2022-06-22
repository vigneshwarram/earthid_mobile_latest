import { createDrawerNavigator } from "@react-navigation/drawer";
import { BottomMenus } from "../navigations/BottomTabs";
import * as React from "react";
import { Dimensions } from "react-native";
import CustomDrawer from "../navigations/CustomDrawer";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/profiles";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: Dimensions.get("screen").width,
        },
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen name="bottomMenuStacks" component={BottomMenus} />
      <Drawer.Screen name="DrawerStacks" component={HomeScreenStack} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;

export const HomeScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
