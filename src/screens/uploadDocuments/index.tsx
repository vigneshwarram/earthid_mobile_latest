import { useTheme } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { RNCamera } from "react-native-camera";
import DocumentPicker from "react-native-document-picker";
import Button from "../../components/Button";
import { LocalImages } from "../../constants/imageUrlConstants";
import { Screens } from "../../themes/index";
import DocumentMask from "../uploadDocuments/DocumentMask";
import RNFS from "react-native-fs";
import GenericText from "../../components/Text";
import { launchImageLibrary } from "react-native-image-picker";
import { useFetch } from "../../hooks/use-fetch";
import { uploadDocument } from "../../utils/earthid_account";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  getHistory,
  saveDocuments,
} from "../../redux/actions/authenticationAction";
import { dateTime } from "../../utils/encryption";
import RNFetchBlob from "rn-fetch-blob";
import { IDocumentProps } from "./VerifiDocumentScreen";
import AnimatedLoader from "../../components/Loader/AnimatedLoader";
import SuccessPopUp from "../../components/Loader";

const ImagePicker = require("react-native-image-picker");

const UploadScreen = (props: any) => {
  const _handleBarCodeRead = (barCodeData: any) => {};
  const { colors } = useTheme();
  const camRef: any = useRef();
  const { loading, data, error, fetch: postFormfetch } = useFetch();
  const userDetails = useAppSelector((state) => state.account);
  const [successResponse, setsuccessResponse] = useState(false);
  const getHistoryReducer = useAppSelector((state) => state.getHistoryReducer);
  const [message, Setmessage] = useState<string>("ooo");
  const [source, setSource] = useState({});
  let documentsDetailsList = useAppSelector((state) => state.Documents);
  const [filePath, setFilePath] = useState();
  const dispatch = useAppDispatch();
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

      let fileUri = resp[0].uri;
      console.log("check==>", resp[0].type);
      RNFS.readFile(fileUri, "base64").then((res) => {
        console.log("res", resp);
        console.log("typePDF", resp[0].uri);

        if (resp[0].type == "application/pdf") {
          const requestedData = {
            type: resp[0].type,
            name: resp[0].name,
            image: resp[0].uri,
          };

          postFormfetch(uploadDocument, requestedData, "FORM-DATA")
            .then(() => {
              const PayLoad = {
                userId: userDetails?.responseData?.Id,
                publicKey: userDetails?.responseData?.publicKey,
              };
              dispatch(getHistory(PayLoad)).then(() => {
                var date = dateTime();
                const filePath =
                  RNFetchBlob.fs.dirs.DocumentDir + "/" + "Adhaar";
                var documentDetails: IDocumentProps = {
                  name: resp[0].name,
                  path: filePath,
                  date: date?.date,
                  time: date?.time,
                  txId: data?.result,
                  docType: "pdf",
                  docExt: ".jpg",
                  processedDoc: "",
                  base64: resp[0].uri,
                  pdf: true,
                };

                var DocumentList = documentsDetailsList?.responseData
                  ? documentsDetailsList?.responseData
                  : [];
                DocumentList.push(documentDetails);
                dispatch(saveDocuments(DocumentList));
                setsuccessResponse(true);
                getHistoryReducer.isSuccess = false;
                setTimeout(() => {
                  setsuccessResponse(false);
                  props.navigation.navigate("Documents");
                }, 2000);
              });
            })
            .catch((error: any) => console.log(error));
        } else {
          props.navigation.navigate("DocumentPreviewScreen", {
            fileUri: {
              uri: `data:image/png;base64,${res}`,
              base64: res,
              file: resp[0],
              type: "qrRreader",
            },
          });
        }
      });
    } catch (err) {
      console.log("data==>", err);
    }
  };

  // const openFilePicker = async () => {
  //   let options:any = {
  //     title: 'Select Image',
  //     customButtons: [
  //       {
  //         name: 'customOptionKey',
  //         title: 'Choose Photo from Custom Option'
  //       },
  //     ],
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   launchImageLibrary(options,(response: { didCancel: any; }) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     }else {
  //       let items:any=""
  //       let source :any =response;
  //       var item =source.assets.map((i:any)=>{
  //         Setmessage(i.bitrate)
  //         setFilePath(i.uri);
  //         items=i.uri
  //       })
  //       // You can also display the image using data:
  //       // let source = {
  //       //   uri: 'data:image/jpeg;base64,' + response.data
  //       // };

  //       console.log(item)

  //       props.navigation.navigate("DocumentPreviewScreen", {
  //                  value: {
  //                     path:items
  //                  },
  //                });
  //     }
  //   });
  // };

  useEffect(() => {}, []);

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
      <GenericText
        style={{ textAlign: "center", paddingVertical: 5, color: "#fff" }}
      >
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
      {loading ||
        (getHistoryReducer?.isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator color={Screens.colors.primary} size="large" />
          </View>
        ))}

      <SuccessPopUp
        isLoaderVisible={successResponse}
        loadingText={"Pdf uploaded successfully"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.black,
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

export default UploadScreen;
