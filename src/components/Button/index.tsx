import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Screens } from "../../themes";

import { IButtonProps } from "./IButtonProps";

/**
 * @author  vicky@
 * @description This is a base component for the implementation of Button.
 */

const Button = ({
  title,
  onPress,
  leftIcon,
  secondary,
  style = {},
}: IButtonProps) => (
  <Pressable>
    <View style={[styles.primary, style.buttonContainer]}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          resizeMode="contain"
          style={[styles.logoContainer, style.iconStyle]}
          source={leftIcon}
        ></Image>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={[styles.common, style.text]}>{title}</Text>
      </View>
    </View>
  </Pressable>
);
export default Button;

const styles = StyleSheet.create({
  logoContainer: {
    width: 30,
    height: 30,
  },
  common: {
    textAlign: "center",
    marginLeft: 10,
    color: Screens.colors.primary,
    fontWeight: "500",
    fontSize: 15,
  },
  primary: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Screens.colors.primary,
    padding: 15,
    flexDirection: "row",
    borderRadius: 50,
    borderColor: Screens.colors.primary,
    borderWidth: 2,
  },
});
