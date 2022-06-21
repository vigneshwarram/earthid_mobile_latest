import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { LocalImages } from "../../constants/imageUrlConstants";
import { Screens } from "../../themes";
import { IIconProps } from "./IIconProps";

/**
 * @author  vicky@
 * @description This is a base component for the implementation of Icon.
 */

const Icon = ({ src, style = {}, isUploaded }: IIconProps) => (
  <View style={[styles.container, style.container]}>
    {isUploaded && (
      <View style={styles.uploadContainer}>
        <Image
          source={LocalImages.upImage}
          style={[styles.uploadImage]}
          resizeMode="contain"
        />
      </View>
    )}
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
  uploadContainer: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: "#25cc25",
    position: "absolute",
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadImage: {
    width: 10,
    height: 10,
    tintColor: Screens.pureWhite,
  },
});
