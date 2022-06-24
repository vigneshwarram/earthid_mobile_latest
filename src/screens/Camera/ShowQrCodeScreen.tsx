import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { RNCamera } from "react-native-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LocalImages } from "../../constants/imageUrlConstants";
import { Screens } from "../../themes/index";
import QrScannerMaskedWidget from "../Camera/QrScannerMaskedWidget";

const CameraScreen = (props: any) => {
  const _handleBarCodeRead = (barCodeData: any) => {};

  return (
    <View style={styles.sectionContainer}>
      <View style={{ position: "absolute", top: 20, left: 20, zIndex: 100 }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ShowQrScreen")}
        >
          <Image
            resizeMode="contain"
            style={[styles.logoContainer]}
            source={LocalImages.scanbarImage}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.black,
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    width: 30,
    height: 30,
  },
});

export default CameraScreen;
