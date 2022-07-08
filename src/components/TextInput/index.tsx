import React from "react";
import { StyleSheet, TextInput, View, Text, Image } from "react-native";
import { LocalImages } from "../../constants/imageUrlConstants";
import { Screens } from "../../themes";

import { ITextInputProps } from "./ITextInputProps";

/**
 * @author  vigneshwar@
 * @description This is a base component for the implementation of TextInput.
 */

const TextInputBox = ({
  onFocus,
  onBlur,
  onChangeText,
  value,
  isFocused = false,
  isError = false,
  isNumeric = false,
  isEditable = true,
  errorText,
  maxLength,
  testId,
  leftIcon,
  placeholder,
  rightIcon,
  style = {},
}: ITextInputProps) => (
  <View>
    {leftIcon && (
      <View style={{ position: "absolute", left: 30, top: 25, zIndex: 100 }}>
        <Image
          resizeMode="contain"
          style={[styles.leftIconContainer, style.leftIconStyle]}
          source={leftIcon}
        ></Image>
      </View>
    )}
    {rightIcon && (
      <View style={{ position: "absolute", right: 30, top: 15, zIndex: 100 }}>
        <Image
          resizeMode="contain"
          style={styles.leftIconContainer}
          source={rightIcon}
        ></Image>
      </View>
    )}
    <TextInput
      placeholder={placeholder}
      testID={testId}
      keyboardType={isNumeric ? "number-pad" : "default"}
      maxLength={maxLength}
      editable={isEditable}
      onFocus={onFocus}
      onBlur={onBlur}
      onChangeText={onChangeText}
      value={value}
      style={[
        styles.container,
        style.container,
        !isEditable && styles.disabledTextInput,
        isError ? styles.error : isFocused && styles.focus,
      ]}
    />
    {isError && <Text style={styles.errorText}>{errorText}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginHorizontal: 20,
    borderWidth: 1,
    paddingLeft: 40,
    borderColor: Screens.black,
    marginTop: 10,
    borderRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
  },
  disabledTextInput: {
    backgroundColor: Screens.grayShadeColor,
  },
  focus: {
    borderColor: Screens.colors.primary,
    borderWidth: 3,
  },
  error: {
    borderColor: Screens.red,
    borderWidth: 1,
    elevation: 0,
  },
  leftIconContainer: {
    width: 20,
    height: 20,
  },
  errorText: {
    color: Screens.red,
    marginBottom: 10,
    marginHorizontal: 20,
  },
});
export default TextInputBox;
