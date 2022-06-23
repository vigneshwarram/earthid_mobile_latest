import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { Screens } from "../../themes";
import Modal from "react-native-modal";
import { ILoaderProps } from "./ILoaderProps";
import LottieView from "lottie-react-native";
import { LocalImages } from "../../constants/imageUrlConstants";
import { ActivityIndicator } from "react-native";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

/**
 * @author  vicky@
 * @description This is a base component for the implementation of Button.
 */

const Button = ({
  isLoaderVisible,
  style = {},
  Status,
  loadingText,
}: ILoaderProps) => (
  <Modal style={{ marginLeft: deviceWidth / 6 }} isVisible={isLoaderVisible}>
    <View
      style={{
        backgroundColor: "#fff",
        width: deviceWidth / 1.5,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
      }}
    >
      {/* <ActivityIndicator size="small" color={Screens.colors.primary} /> */}
      <LottieView
        style={{ width: 90, height: 90 }}
        source={LocalImages.LOTTIEICONS.success}
        autoPlay
        loop
      />
      <Text
        style={[
          styles.categoryHeaderText,
          {
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            color: Screens.black,
          },
        ]}
      >
        {Status}
      </Text>
      <Text
        style={[
          styles.categoryHeaderText,
          {
            fontSize: 14,
            fontWeight: "500",
            textAlign: "center",
            color: Screens.black,
          },
        ]}
      >
        {loadingText}
      </Text>
    </View>
  </Modal>
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
  categoryHeaderText: {
    marginHorizontal: 20,
    marginVertical: 5,

    color: Screens.headingtextColor,
  },
  primary: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLef: deviceWidth / 2,
    backgroundColor: Screens.colors.primary,
    padding: 15,
    flexDirection: "row",
    borderRadius: 50,
    borderColor: Screens.colors.primary,
    borderWidth: 2,
  },
});
