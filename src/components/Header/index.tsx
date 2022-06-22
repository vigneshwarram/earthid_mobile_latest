import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LocalImages } from "../../constants/imageUrlConstants";
import { SCREENS } from "../../constants/Labels";
import { Screens } from "../../themes";
import Avatar from "../Avatar";
import LinearGradients from "../GradientsPanel/LinearGradient";
import { IHeaderProps } from "./IHeaderProps";

/**
 * @author  vicky@
 * @description This is a base component for the implementation of Icon.
 */

const Header = ({
  containerStyle = {},
  linearStyle = {},
  onpress,
  isAvatar,
  letfIconPress,
  rightIconSource,
  rewardPoints,
  leftIconSource,
  avatarClick,
}: IHeaderProps) => (
  <View style={containerStyle}>
    <LinearGradients
      horizontalGradient={false}
      endColor={Screens.colors.header.endColor}
      middleColor={Screens.colors.header.middleColor}
      startColor={Screens.colors.header.startColor}
      style={linearStyle}
    >
      <View>
        <View style={styles.sectionHeaderContainer}>
          <TouchableOpacity
            style={containerStyle.iconContainer}
            disabled={letfIconPress ? false : true}
            onPress={letfIconPress}
          >
            <Image
              resizeMode="contain"
              style={[styles.logoContainer, containerStyle.iconStyle]}
              source={leftIconSource}
            ></Image>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              flex: 0.4,
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity style={styles.closeContainer} onPress={onpress}>
              <Image
                resizeMode="contain"
                style={styles.close}
                source={rightIconSource}
              ></Image>
            </TouchableOpacity>
            {rewardPoints !== "" && (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", marginLeft: -5 }}>
                  {rewardPoints}
                </Text>
              </View>
            )}

            <TouchableOpacity style={styles.closeContainer} onPress={onpress}>
              <Image
                resizeMode="contain"
                style={styles.close}
                source={LocalImages.humbergerImage}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
        {isAvatar && (
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={avatarClick}
          >
            <View>
              <Avatar
                isUploaded={false}
                text={SCREENS.HOMESCREEN.avatarName}
                iconSource={LocalImages.avatarImage}
              ></Avatar>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradients>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  image: {
    height: 20,
    width: 20,
  },
  closeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    height: 120,
    backgroundColor: Screens.colors.customDrawer.headerBackground,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 130,
    height: 120,
  },
  close: {
    width: 25,
    height: 25,
  },
});
