import React from "react";
import { StyleSheet, View } from "react-native";
import { Screens } from "../../themes";
import LinearGradients from "../GradientsPanel/LinearGradient";
import { IHeaderProps } from "./IHeaderProps";

/**
 * @author  vicky@
 * @description This is a base component for the implementation of Icon.
 */

const Header = ({ containerStyle = {}, linearStyle = {} }: IHeaderProps) => (
  <View style={containerStyle}>
    <LinearGradients
      horizontalGradient
      endColor={Screens.colors.ScanButton.endColor}
      middleColor={Screens.colors.ScanButton.middleColor}
      startColor={Screens.colors.ScanButton.startColor}
      style={linearStyle}
    ></LinearGradients>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  image: {
    height: 20,
    width: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
