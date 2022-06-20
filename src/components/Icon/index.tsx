import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { IIconProps } from "./IIconProps";

/**
 * @author  vicky@
 * @description This is a base component for the implementation of Icon.
 */

const Icon = ({ src, style = {} }: IIconProps) => (
  <View style={[styles.container, style.container]}>
    <Image
      source={src}
      style={[styles.image, style.image]}
      resizeMode="contain"
    />
  </View>
);

export default Icon;

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
