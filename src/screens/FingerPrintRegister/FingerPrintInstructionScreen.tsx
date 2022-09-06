import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

import Button from "../../components/Button";
import GenericText from "../../components/Text";
import { LocalImages } from "../../constants/imageUrlConstants";
import { Screens } from "../../themes/index";

import Loader from "../../components/Loader";
import { StackActions } from "@react-navigation/native";

const FingerPrintInstructionScreen = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const aunthenticateBioMetricInfo = () => {
    props.navigation.dispatch(StackActions.replace("DrawerNavigator"));
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={{ position: "absolute", top: 20, right: 20, zIndex: 100 }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            resizeMode="contain"
            style={[styles.logoContainer]}
            source={LocalImages.closeImage}
          ></Image>
        </TouchableOpacity>
      </View>
      <View></View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          resizeMode="contain"
          style={{ width: 300, height: 300 }}
          source={LocalImages.fingerprint}
        ></Image>
        <GenericText
          style={[
            {
              fontSize: 20,

              color: Screens.pureWhite,
              fontWeight: "500",
            },
          ]}
        >
          {"Authenticated Device's Fingerprint"}
        </GenericText>

        <GenericText
          style={[
            {
              fontSize: 14,
              textAlign: "center",
              marginHorizontal: 30,
              marginVertical: 20,
              color: Screens.pureWhite,
              fontWeight: "100",
            },
          ]}
        >
          {"Please authenticate to enable fingerprint authentication"}
        </GenericText>
      </View>

      <Button
        onPress={() => aunthenticateBioMetricInfo()}
        style={{
          buttonContainer: {
            elevation: 5,
            marginHorizontal: 10,
          },
          text: {
            color: Screens.pureWhite,
          },
          iconStyle: {
            tintColor: Screens.pureWhite,
          },
        }}
        title={"Continue"}
      ></Button>
      <Loader
        loadingText="Finger Print authenticated successfully !"
        Status="Success !"
        isLoaderVisible={isLoading}
      ></Loader>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.black,
    justifyContent: "space-between",
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    width: 15,
    height: 15,
    tintColor: "#fff",
  },
});

export default FingerPrintInstructionScreen;
