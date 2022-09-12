import React from "react";
import { Pressable, StyleSheet, Image, View } from "react-native";
import { LocalImages } from "../../constants/imageUrlConstants";

import { useAppSelector } from "../../hooks/hooks";
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
  isCategory = false,
}: IAvatarProps) => {
  const userDetails = useAppSelector((state) => state.account);
  return (
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
        <View>
          <GenericText style={[styles.text, style.text]}>{text}</GenericText>
          {!isCategory && (
            <View style={styles.row}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={LocalImages.email}
                  style={{ width: 15, height: 15, marginTop: 10 }}
                ></Image>
              </View>

              <GenericText
                style={[styles.text, style.text, { marginLeft: 10 }]}
              >
                {userDetails?.responseData?.email}
              </GenericText>
            </View>
          )}

          {!isCategory && (
            <View style={styles.row}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={LocalImages.phone}
                  style={{ width: 15, height: 15, marginTop: 10 }}
                ></Image>
              </View>
              <GenericText
                style={[styles.text, style.text, { marginLeft: 10 }]}
              >
                {userDetails?.responseData?.phone}
              </GenericText>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
  },
  row: {
    flexDirection: "row",
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
