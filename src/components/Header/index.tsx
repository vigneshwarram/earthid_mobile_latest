import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LocalImages } from "../../constants/imageUrlConstants";
import { Screens } from "../../themes";
import Avatar from "../Avatar";
import LinearGradients from "../GradientsPanel/LinearGradient";
import GenericText from "../Text";
import { IHeaderProps } from "./IHeaderProps";

/**
 * @author  vicky@
 * @description This is a base component for the implementation of Icon.
 */

const Header = ({
  containerStyle = {},
  linearStyle = {},
  onpress,
  isUploaded = false,
  isAvatar,
  isProfileAvatar = false,
  absoluteCircleInnerImage,
  letfIconPress,
  rightIconSource,
  actionIcon = LocalImages.humbergerImage,
  rewardPoints,
  profileName,
  leftIconSource,
  avatarClick,
  isLogoAlone,
  headingText,
  isBack = false,
  rightIconPress,
}: IHeaderProps) => (
  <View style={containerStyle}>
    <LinearGradients
      horizontalGradient={false}
      endColor={Screens.colors.header.endColor}
      middleColor={Screens.colors.header.middleColor}
      startColor={Screens.colors.header.startColor}
      style={linearStyle}
    >
      {headingText ? (
        <GenericText
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 20,
            color: Screens.black,
            marginTop: 30,
          }}
        >
          {headingText}
        </GenericText>
      ) : isLogoAlone ? (
        <View style={{ alignItems: "center" }}>
          <Image
            resizeMode="contain"
            style={[styles.logoContainer, containerStyle.iconStyle]}
            source={LocalImages.logoImage}
          ></Image>
        </View>
      ) : (
        <View>
          <View style={styles.sectionHeaderContainer}>
            <TouchableOpacity
              style={containerStyle.iconContainer}
              disabled={letfIconPress ? false : true}
              onPress={letfIconPress}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  {isBack && (
                    <Image
                      resizeMode="contain"
                      style={{ width: 15, height: 15 }}
                      source={LocalImages.backImage}
                    ></Image>
                  )}
                </View>

                <Image
                  resizeMode="contain"
                  style={[styles.logoContainer]}
                  source={LocalImages.logoImage}
                ></Image>
              </View>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={styles.closeContainer}
                  onPress={rightIconPress}
                >
                  <Image
                    resizeMode="contain"
                    style={styles.close}
                    source={rightIconSource}
                  ></Image>
                </TouchableOpacity>
                {rewardPoints !== "" && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", marginLeft: -5 }}>
                      {rewardPoints}
                    </Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={[styles.closeContainer, { marginLeft: 10 }]}
                onPress={onpress}
              >
                <Image
                  resizeMode="contain"
                  style={styles.close}
                  source={actionIcon}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
          {isAvatar && (
            <Avatar
              avatarClick={avatarClick}
              style={{ text: { color: Screens.pureWhite } }}
              absoluteCircleInnerImage={absoluteCircleInnerImage}
              isProfileAvatar={isProfileAvatar}
              isUploaded={isUploaded}
              text={profileName}
              iconSource={LocalImages.avatarImage}
            ></Avatar>
          )}
        </View>
      )}
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
