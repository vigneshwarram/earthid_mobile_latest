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
  headingtextColor: "#4A4A4A",
  pureWhite: "#ffffff",
  red: "red",
  grayShadeColor: "#7F7F7F",
  success: "#25cc25",
  darkGray: "#EAEAEA",
  lightGray: "#F8F8F8",
  thickGray: "#EDF1F4",
  colors: {
    background: "#F5F5F5",
    primary: "#50A0D9",
    ScanButton: {
      startColor: "#8319FF",
      middleColor: "#8319FF",
      endColor: "#2AA2DE",
    },
    header: {
      startColor: "#f0f4f7",
      middleColor: "#dbe4ee",
      endColor: "#c0cfdd",
    },
    bottomFocusedBackground: {
      color: "#EDF1F4",
    },
    customDrawer: {
      headerBackground: "#D9E3EC",
    },
  },
};
