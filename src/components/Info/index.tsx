import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LocalImages } from "../../constants/imageUrlConstants";
import { Screens } from "../../themes";

import { IInfoProps } from "./IInfoProps";

/**
 * @author  vicky@
 * @description This is a base component for the implementation of Info.
 */

const Info = ({
  title,
  subtitle,
  style = {},
  titleIcon,
  subtitleRowText,
  subTitlePress,
}: IInfoProps) => (
  <View style={[styles.container, style.container]}>
    {title && (
      <View style={styles.titleTextContainer}>
        <View>
          <Text style={[styles.title, style.title]}>{title}</Text>
          {subtitle && (
            <View style={styles.titleTextContainer}>
              <Text style={[styles.subtitle, style.subtitle]}>{subtitle}</Text>
              {subtitleRowText && (
                <TouchableOpacity onPress={subTitlePress}>
                  <View style={styles.titleTextContainer}>
                    <View
                      style={{
                        paddingHorizontal: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {subtitleRowText === "verified" && (
                        <Image
                          resizeMode="contain"
                          style={styles.sublogoContainers}
                          source={LocalImages.successTikImage}
                        ></Image>
                      )}
                    </View>
                    <Text style={[styles.subtitle, style.subtitleNearText]}>
                      {subtitleRowText}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          )}
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
      </View>
    )}
  </View>
);

export default Info;

const styles = StyleSheet.create({
  logoContainers: {
    width: 50,
    height: 50,
  },
  sublogoContainers: {
    width: 15,
    height: 15,
    marginRight: 8,
  },
  titleTextContainer: {
    flexDirection: "row",
  },
  imageContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    bottom: 25,
    left: 150,
    right: 0,
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
