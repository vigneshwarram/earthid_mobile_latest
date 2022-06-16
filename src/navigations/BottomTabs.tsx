import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, StyleSheet } from "react-native";
import * as React from "react";
import { useTheme } from "@react-navigation/native";
import HomeScreen from "../screens/bottomTabs/homeTab";
import { LocalImages } from "../constants/imageUrlConstants";

const Tab = createBottomTabNavigator();
export const BottomMenus = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }: any) => (
            <View>
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
        name="Home1"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }: any) => (
            <View>
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
        name="Home2"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.circle}>
              <View
                style={[
                  styles.Innercircle,
                  { backgroundColor: colors.background },
                ]}
              >
                <Image style={styles.ImgStyle} source={LocalImages.homeImage} />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home3"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }: any) => (
            <View>
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
        name="Home4"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }: any) => (
            <View>
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
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  circle: {
    marginBottom: 20,
    backgroundColor: "#fff",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  Innercircle: {
    elevation: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  ImgStyle: {
    width: 25,
    tintColor: "#fff",
    height: 25,
    resizeMode: "contain",
  },
});
