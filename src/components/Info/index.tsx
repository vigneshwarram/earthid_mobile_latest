import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Screens } from "../../themes";

import { IInfoProps } from "./IInfoProps";

/**
 * @author  vicky@
 * @description This is a base component for the implementation of Info.
 */

const Info = ({ title, subtitle, style = {} }: IInfoProps) => (
  <View style={[styles.container, style.container]}>
    {title && <Text style={[styles.title, style.title]}>{title}</Text>}
    {subtitle && (
      <Text style={[styles.subtitle, style.subtitle]}>{subtitle}</Text>
    )}
  </View>
);

export default Info;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12.5,
    paddingHorizontal: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Screens.black,
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 1.5,
  },
  subtitle: {
    color: Screens.black,
    opacity: 0.4,
    fontSize: 12,
    paddingVertical: 1.5,
  },
});
