import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "../Icon";
import GenericText from "../Text";
import { IAvatarProps } from "./IAvatarProps";

/**
 * @author  vicky@
 * @description This is a base component for the implementation of Avatar.
 */

const Avatar = ({
  text,
  style = {},
  iconSource,
  isUploaded,
  isProfileAvatar = false,
  absoluteCircleInnerImage,
  avatarClick,
}: IAvatarProps) => (
  <Pressable onPress={avatarClick}>
    <Icon
      onPress={avatarClick}
      absoluteCircleInnerImage={absoluteCircleInnerImage}
      isProfileAvatar={isProfileAvatar}
      isUploaded={isUploaded}
      src={iconSource}
      style={{
        container: [styles.container, style.container],
        image: [styles.avatar, style.imgContainer],
        uploadImageStyle: style.uploadImageStyle,
      }}
    />
    {text !== "" && (
      <GenericText style={[styles.text, style.text]}>{text}</GenericText>
    )}
  </Pressable>
);

export default Avatar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 25,
    fontSize: 18,
    color: "#000",
    marginTop: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: -25,
  },
});
