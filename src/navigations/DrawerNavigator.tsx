import { createDrawerNavigator } from "@react-navigation/drawer";
import { BottomMenus } from "../navigations/BottomTabs";
import * as React from "react";
import { Dimensions } from "react-native";
import CustomDrawer from "../navigations/CustomDrawer";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/profiles";
import EditProfileScreen from "../screens/profiles/EditProfile";
import settings from "../screens/settings";
import ShowQrScreen from "../screens/Camera/ShowQrCodeScreen";
import { SlidAnimation } from "./SlidAnimation";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const animations: any = SlidAnimation;
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
      <Drawer.Screen
        options={{
          ...animations,
        }}
        name="bottomMenuStacks"
        component={BottomMenus}
      />
      <Drawer.Screen
        options={{
          ...animations,
        }}
        name="DrawerStacks"
        component={HomeScreenStack}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;

export const HomeScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{
          ...animations,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{
          ...animations,
        }}
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
      <Stack.Screen
        options={{
          ...animations,
        }}
        name="settings"
        component={settings}
      />
      <Stack.Screen
        options={{
          ...animations,
        }}
        name="ShowQrScreen"
        component={ShowQrScreen}
      />
    </Stack.Navigator>
  );
};
