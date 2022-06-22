import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Screens } from "../../themes";

import { IInfoProps } from "./IInfoProps";

/**
 * @author  vicky@
 * @description This is a base component for the implementation of Info.
 */

const Info = ({ title, subtitle, style = {}, titleIcon }: IInfoProps) => (
  <View style={[styles.container, style.container]}>
    {title && (
      <View style={styles.titleTextContainer}>
        <Text style={[styles.title, style.title]}>{title}</Text>
        {titleIcon && (
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              style={styles.logoContainers}
              source={titleIcon}
            ></Image>
          </View>
        )}
      </View>
    )}
    {subtitle && (
      <Text style={[styles.subtitle, style.subtitle]}>{subtitle}</Text>
    )}
  </View>
);

export default Info;

const styles = StyleSheet.create({
  logoContainers: {
    width: 30,
    height: 30,
  },
  titleTextContainer: {
    flexDirection: "row",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    marginLeft: -20,
  },
});
