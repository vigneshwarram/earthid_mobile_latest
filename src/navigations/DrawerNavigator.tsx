import { createDrawerNavigator } from "@react-navigation/drawer";
import { BottomMenus } from "../navigations/BottomTabs";
import * as React from "react";
import { Dimensions } from "react-native";
import CustomDrawer from "../navigations/CustomDrawer";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          width: Dimensions.get("screen").width,
        },
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen name="authenticatedStack" component={BottomMenus} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
