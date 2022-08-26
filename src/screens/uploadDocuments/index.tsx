import { useTheme } from "@react-navigation/native";
import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { RNCamera } from "react-native-camera";
import DocumentPicker from "react-native-document-picker";
import Button from "../../components/Button";
import { LocalImages } from "../../constants/imageUrlConstants";
import { Screens } from "../../themes/index";
import DocumentMask from "../uploadDocuments/DocumentMask";
import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
import GenericText from "../../components/Text";

const UploadScreen = (props: any) => {
  const _handleBarCodeRead = (barCodeData: any) => {};
  const { colors } = useTheme();
  const camRef: any = useRef();

  const _takePicture = async () => {
    const options = { quality: 0.1, base64: true };
    const data = await camRef.current.takePictureAsync(options);
    if (data) {
      props.navigation.navigate("DocumentPreviewScreen", { fileUri: data });
    }
  };
  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "EarthId Storage Acess",
          message: "EarthId needs access to your storage ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const openFilePicker = async () => {
    if (Platform.OS == "android") {
      await requestPermission();
    }
    try {
      const resp: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        readContent: true,
      });
      console.log("destPath", resp);
      let fileUri = resp[0].uri;
      RNFS.readFile(fileUri, "base64").then((res) => {
        console.log("res", res);
        props.navigation.navigate("DocumentPreviewScreen", {
          fileUri: { uri: `data:image/png;base64,${res}`, base64: res },
        });
      });
    } catch (err) {
      console.log("data==>", err);
    }
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

      <RNCamera
        ref={camRef}
        style={styles.preview}
        androidCameraPermissionOptions={null}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        onBarCodeRead={(data) => _handleBarCodeRead(data)}
      >
        <DocumentMask />
      </RNCamera>
      <GenericText
        style={{
          textAlign: "center",
          paddingVertical: 5,
          fontWeight: "bold",
          fontSize: 16,
          color: "#fff",
        }}
      >
        {"capture"}
      </GenericText>
      <GenericText style={{ textAlign: "center", paddingVertical: 5, color: "#fff" }}>
        {"placethedoc"}
      </GenericText>
      <TouchableOpacity onPress={_takePicture}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.primary,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderColor: "#fff",
              borderWidth: 1,
              borderRadius: 25,
              backgroundColor: "transparent",
            }}
          ></View>
        </View>
      </TouchableOpacity>
      <GenericText
        style={{
          textAlign: "center",
          paddingVertical: 5,
          fontWeight: "bold",
          fontSize: 18,
          color: "#fff",
        }}
      >
        {"or"}
      </GenericText>
      <Button
        onPress={openFilePicker}
        leftIcon={LocalImages.upload}
        style={{
          buttonContainer: {
            elevation: 5,
          },
          text: {
            color: Screens.pureWhite,
          },
          iconStyle: {
            tintColor: Screens.pureWhite,
          },
        }}
        title={"uploadgallery"}
      ></Button>
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
    width: 15,
    height: 15,
    tintColor: "#fff",
  },
});

export default UploadScreen;
