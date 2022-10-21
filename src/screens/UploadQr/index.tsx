import { useTheme } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { RNCamera } from "react-native-camera";
import DocumentPicker from "react-native-document-picker";
import Button from "../../components/Button";
import { LocalImages } from "../../constants/imageUrlConstants";
import { Screens } from "../../themes/index";
import DocumentMask, {
  QrScannerMaskedWidget,
} from "../uploadDocuments/DocumentMask";
import RNFS from "react-native-fs";
import GenericText from "../../components/Text";
import { launchImageLibrary } from "react-native-image-picker";

const UploadQr = (props: any) => {
  const { colors } = useTheme();
  const camRef: any = useRef();

  const [message, Setmessage] = useState<string>("ooo");
  const [data, SetData] = useState(null);
  const [source, setSource] = useState({});
  const [filePath, setFilePath] = useState();

  const _takePictureAsync = async () => {
    const options = { quality: 1, base64: true };
    const data = await camRef.current.takePictureAsync(options);

    if (data) {
      props.navigation.navigate("UploadDocumentPreviewScreen", {
        fileUri: data,
      });
    }
  };
  const requestPermission = async () => {
    try {
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

      let fileUri = resp[0].uri;
      RNFS.readFile(fileUri, "base64").then((res) => {
        console.log("res", resp);
        props.navigation.navigate("UploadDocumentPreviewScreen", {
          fileUri: {
            uri: `data:image/png;base64,${res}`,
            base64: res,
            file: resp[0],
            type: "qrRreader",
          },
        });
      });
    } catch (err) {
      console.log("data==>", err);
    }
  };
  const _handleBarCodeRead = (barCodeData: any) => {
    console.log("barcodedata");
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
      <View
        style={{
          flex: 0.7,
        }}
      >
        <RNCamera
          ref={camRef}
          style={styles.preview}
          androidCameraPermissionOptions={null}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          onBarCodeRead={(data) => _handleBarCodeRead(data)}
        ></RNCamera>
      </View>
      <View>
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
        <GenericText
          style={{ textAlign: "center", paddingVertical: 5, color: "#fff" }}
        >
          {"placethedoc"}
        </GenericText>
        <TouchableOpacity onPress={_takePictureAsync}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.black,
    justifyContent: "space-between",
  },
  preview: {
    flex: 0.7,
    marginTop: 100,
  },
  logoContainer: {
    width: 15,
    height: 15,
    tintColor: "#fff",
  },
});

export default UploadQr;
