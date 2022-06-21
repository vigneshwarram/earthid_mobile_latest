import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, StyleSheet } from "react-native";
import * as React from "react";
import { useTheme } from "@react-navigation/native";

import { LocalImages } from "../constants/imageUrlConstants";
import LinearGradients from "../components/GradientsPanel/LinearGradient";
import { Screens } from "../themes/index";
import { HomeScreenStack, DocumentScreenStack } from "../navigations/Stacks";

const Tab = createBottomTabNavigator();

export const BottomMenus = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenStack}
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused }: any) => (
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: focused ? "#EDF1F4" : "transparent" },
              ]}
            >
              <Image
                style={[
                  styles.ImgStyle,
                  {
                    tintColor: focused ? colors.primary : colors.background,
                  },
                ]}
                source={LocalImages.homeImage}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Document"
        component={DocumentScreenStack}
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused }: any) => (
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: focused ? "#EDF1F4" : "transparent" },
              ]}
            >
              <Image
                style={[
                  styles.ImgStyle,
                  {
                    tintColor: focused ? colors.primary : colors.background,
                  },
                ]}
                source={LocalImages.homeImage}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="s"
        component={DocumentScreenStack}
        options={{
          tabBarLabelStyle: {
            color: "transparent",
          },

          tabBarIcon: () => (
            <View style={{ overflow: "hidden", paddingTop: 5 }}>
              <View style={styles.circle}>
                <LinearGradients
                  horizontalGradient
                  endColor={Screens.colors.ScanButton.endColor}
                  middleColor={Screens.colors.ScanButton.middleColor}
                  startColor={Screens.colors.ScanButton.startColor}
                  style={[styles.Innercircle]}
                >
                  <Image
                    style={styles.ImgStyle}
                    source={LocalImages.scanImage}
                  />
                </LinearGradients>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={DocumentScreenStack}
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused }: any) => (
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: focused
                    ? Screens.colors.bottomFocusedBackground.color
                    : "transparent",
                },
              ]}
            >
              <Image
                style={[
                  styles.ImgStyle,
                  {
                    tintColor: focused ? colors.primary : colors.background,
                  },
                ]}
                source={LocalImages.historyImage}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={DocumentScreenStack}
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused }: any) => (
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: focused ? "#EDF1F4" : "transparent" },
              ]}
            >
              <Image
                style={[
                  styles.ImgStyle,
                  {
                    tintColor: focused ? colors.primary : colors.background,
                  },
                ]}
                source={LocalImages.moreImage}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  circle: {
    marginBottom: 20,
    backgroundColor: "#fff",
    width: 70,
    height: 80,
    borderRadius: (70 + 80) / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  Innercircle: {
    elevation: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    width: 68,
    height: 70,
    borderRadius: (68 + 70) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    position: "absolute",
    zIndex: 100,
    height: 75,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  ImgStyle: {
    width: 25,
    tintColor: "#fff",
    height: 25,
    resizeMode: "contain",
  },
  tabBarLabelStyle: {
    fontWeight: "900",
  },
});
