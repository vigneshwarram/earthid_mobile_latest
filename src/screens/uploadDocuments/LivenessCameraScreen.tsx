import { useTheme } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
} from "react-native";
import { RNCamera } from "react-native-camera";

import Button from "../../components/Button";
import { SnackBar } from "../../components/SnackBar";
import { LocalImages } from "../../constants/imageUrlConstants";
import { Screens } from "../../themes/index";
import DocumentMask from "../uploadDocuments/DocumentMask";

const LivenessCameraScreen = (props: any) => {
  const { fileUri } = props.route.params;
  const [maskedColor, setmaskedColor] = useState("#fff");
  const [data, setData] = useState();
  // Initial state of variables
  let rightEyeOpen: any[] = [];
  let camera: {
    takePictureAsync: (arg0: { quality: number; base64: boolean }) => any;
  } | null = null;
  let faceCount = 0;
  let faceId: null = null;
  let faceOrigin: any[] = [];
  let stillToast = true;
  let faceDetected = false;

  // Averaging Function
  const average = (array: any[]) =>
    array && array.length > 0
      ? array.reduce((a: any, b: any) => a + b) / array.length
      : 0;

  // Face Distance Calculator
  const distance = (x0: number, y0: number, x1: number, y1: number) =>
    Math.hypot(x1 - x0, y1 - y0);

  const _handleBarCodeRead = async (faceArray: any) => {
    if (!faceDetected) {
      // Face Recognition algorithm
      if (faceArray.faces.length === 1 && faceCount < 15) {
        var id = faceArray.faces[0].faceID;
        if (faceId === null) {
          faceId = id;
        }

        if (faceArray.faces[0].faceID === id) {
          rightEyeOpen.push(faceArray.faces[0].rightEyeOpenProbability);
          faceOrigin.push(faceArray.faces[0].bounds.origin);
        }
        faceCount += 1;
      } else {
        var avg = average(rightEyeOpen);
        var min = Math.min(...rightEyeOpen);
        var threshold = avg / 2;
        var hasMoved = false;
        for (let index = 0; index < faceOrigin.length - 1; index++) {
          var displacement = distance(
            faceOrigin[index].x,
            faceOrigin[index].y,
            faceOrigin[index + 1].x,
            faceOrigin[index + 1].y
          );
          if (displacement > 30) {
            hasMoved = true;
            if (stillToast) {
              SnackBar({
                indicationMessage: "Be still like a stone !",
              });
              setmaskedColor("red");
            } else {
              setmaskedColor("red");
              SnackBar({
                indicationMessage: "I can still see you moving",
              });
            }
            break;
          }
        }
        if (!hasMoved && avg > 0.5) {
          console.log(avg, min);
          if (min < threshold && faceId === faceArray.faces[0].faceID) {
            setmaskedColor("green");
            SnackBar({
              indicationMessage: "Aww, Thank you",
            });

            faceDetected = true;
            const options = {
              quality: 0.2,
              base64: true,
            };
            const data = await camRef.current.takePictureAsync(options);
            if (data) {
              setData(data);
            }
          } else {
            SnackBar({
              indicationMessage: "I can still see you moving",
            });
          }
        }
        faceOrigin = [];
        faceId = null;
        faceCount = 0;
        rightEyeOpen = [];
      }
    }
  };
  const { colors } = useTheme();
  const camRef: any = useRef();

  const handlingFacialData = async () => {
    if (data) {
      props.navigation.navigate("VerifiDocumentScreen", {
        uploadedDocuments: fileUri,
        faceImageData: data,
      });
    }
    if (Platform.OS === "ios") {
      const options = {
        quality: 0.5,
        base64: true,
      };
      const datas = await camRef.current.takePictureAsync(options);
      if (datas) {
        props.navigation.navigate("VerifiDocumentScreen", {
          uploadedDocuments: fileUri,
          faceImageData: data,
        });
      }
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
        onMountError={(errr) => {
          console.log("onmount error", errr);
        }}
        style={styles.preview}
        androidCameraPermissionOptions={null}
        type={RNCamera.Constants.Type.front}
        focusDepth={1.0}
        trackingEnabled={true}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        onFacesDetected={!data && _handleBarCodeRead}
        captureAudio={false}
      >
        <DocumentMask color={maskedColor} />
      </RNCamera>
      <Text
        style={{
          textAlign: "center",
          paddingVertical: 5,
          fontWeight: "bold",
          fontSize: 16,
          color: "#fff",
        }}
      >
        Capture
      </Text>
      <Text style={{ textAlign: "center", paddingVertical: 5, color: "#fff" }}>
        Place your face inside the live box!
      </Text>
      <TouchableOpacity onPress={data && handlingFacialData}>
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

export default LivenessCameraScreen;
