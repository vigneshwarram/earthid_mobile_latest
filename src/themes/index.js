import { DefaultTheme } from "@react-navigation/native";
export const Apptheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2AA2DE",
    background: "#000",
  },
};
export const Screens = {
  black: "#000",

  colors: {
    background: "#F5F5F5",
    ScanButton: {
      startColor: "#8319FF",
      middleColor: "#8319FF",
      endColor: "#2AA2DE",
    },
    bottomFocusedBackground: {
      color: "#EDF1F4",
    },
    customDrawer: {
      headerBackground: "#D9E3EC",
    },
  },
};
