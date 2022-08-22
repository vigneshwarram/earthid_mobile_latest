import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Share,
  PermissionsAndroid,
  Alert,
  BackHandler,
  Platform,
} from "react-native";
import Header from "../../../components/Header";
import { SCREENS } from "../../../constants/Labels";
import { Screens } from "../../../themes";
import Loader from "../../../components/Loader";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import QRCode from "react-native-qrcode-svg";
import Button from "../../../components/Button";
import RNPdfToImage from "react-native-pdf-to-image";
import RNFS from "react-native-fs";
import { alertBox, sleep } from "../../../utils/earthid_account";
import { baseData } from "./cb-base64-string";

interface IHomeScreenProps {
  navigation?: any;
}

const Register = ({ navigation }: IHomeScreenProps) => {
  const phoneInput: any = useRef();
  const [mobileNumber, setmobileNumber] = useState();
  const [isLoading, setIsLoading] = useState(false);
  let [qrBase64, setBase64] = useState("");
  const refqr: any = useRef();
  const _navigateAction = () => {
    onShare();
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          navigation.navigate("Security");
          // shared with activity type of result.activityType
        } else {
          navigation.navigate("Security");
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  };
  const callback = (data: any) => {
    console.log("data", data);
  };
  const captureScreenShot = async () => {
    refqr.current.toDataURL(callback);
    if (Platform.OS === "android") {
      if (await requestExternalStoragePermission()) {
        var d = new Date();
        const month = d.getMonth() + 1;
        const fileName =
          "EarthId_Test_" +
          d.getDate() +
          "_" +
          month +
          "_" +
          d.getFullYear() +
          "_" +
          d.getHours() +
          "_" +
          d.getMinutes();
        let options = {
          html:
            `<html>
                    <body>
                    <div style="display:flex; align-items:center; width:100%; flex-direction:column;">
                    <p>This is your QR code, keep it safe.</p>
                    <img src=` +
            baseData +
            ` style="width:80%;" />
                    <div>
                    </body>
                  </html>`,
          fileName: fileName,
          directory: "Documents",
          width: 20,
        };
        let filetoPdf = await RNHTMLtoPDF.convert(options);
        console.log("testing", filetoPdf);
        const attachimageUri = "file://";
        let file = await RNPdfToImage.convert(
          `${attachimageUri}${filetoPdf.filePath}`
        );
        console.log("file", file);
        console.log("file", file.outputFiles[0]);
        //console.log('this.state.base64',this.state.base64 )
        //const destPath = `${RNFS.DownloadDirectoryPath}/${fileName}.png`
        //await CameraRoll.saveToCameraRoll(file.outputFiles[0]);
        const destPath = `${RNFS.DownloadDirectoryPath}/${fileName}.png`;
        await RNFS.copyFile(file.outputFiles[0], destPath);

        await sleep(10);
        onShare();
        Alert.alert("Image saved succesfully as PNG in Download");
      }
    } else {
    }
  };
  const requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        // {
        //     title: 'Earth Id Storage Permission',
        //     message: 'Earth Id needs access to your storage ' +
        //         'so you can save your photos',
        // },
      );
      return granted == "granted"
        ? true
        : granted == "never_ask_again"
        ? securityModalPopup()
        : securityModalPopup();
    } catch (err) {
      console.error("Failed to request permission ", err);
      return false;
    }
  };

  const securityModalPopup = () => {
    Alert.alert(
      "Device Permission",
      "To grant Device id you need to all the app permission from (Setting > App > Earth Id > Permission)",
      [
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel'),
        //   style: 'cancel',
        // },
        { text: "OK", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.sectionContainer}>
      <ScrollView contentContainerStyle={styles.sectionContainer}>
        <Header
          isLogoAlone={true}
          headingText={"Important"}
          linearStyle={styles.linearStyle}
          containerStyle={{
            iconStyle: {
              width: 205,
              height: 72,
              marginTop: 30,
            },
            iconContainer: styles.alignCenter,
          }}
        ></Header>
        <View style={styles.category}>
          <View>
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
              {SCREENS.BACKUPIDENTYSCREEN.instruction}
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
              {SCREENS.BACKUPIDENTYSCREEN.instructions}
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <QRCode
              //QR code value
              value={"NA"}
              getRef={refqr}
              //size of QR Code
              size={200}
              //Color of the QR Code (Optional)
              color="black"
              //Background Color of the QR Code (Optional)
              backgroundColor="white"
              //Logo of in the center of QR Code (Optional)

              //Center Logo size  (Optional)
              logoSize={30}
              //Center Logo margin (Optional)
              logoMargin={2}
              //Center Logo radius (Optional)
              logoBorderRadius={10}
              //Center Logo background (Optional)
              logoBackgroundColor="yellow"
            />
          </View>
          <Button
            onPress={captureScreenShot}
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
            title={"DOWNLOAD QR CODE"}
          ></Button>
          <Loader
            loadingText="QR Code Downloaded successfully."
            Status="Success !"
            isLoaderVisible={isLoading}
          ></Loader>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexGrow: 1,
    backgroundColor: Screens.colors.background,
  },
  title: {
    color: Screens.grayShadeColor,
  },
  subtitle: {
    color: Screens.black,
    paddingLeft: 20,
    fontWeight: "bold",
    fontSize: 15,
    opacity: 1,
  },
  containerForSocialMedia: {
    marginTop: 10,
    marginHorizontal: 10,
    borderColor: Screens.grayShadeColor,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: "center",
  },

  textContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  linearStyle: {
    height: 250,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
  },
  categoryHeaderText: {
    marginHorizontal: 20,
    marginVertical: 10,

    color: Screens.headingtextColor,
  },

  flatPanel: {
    marginHorizontal: 25,
    height: 80,
    borderRadius: 15,
    backgroundColor: Screens.colors.background,
    elevation: 15,
    marginTop: -40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainers: {
    width: 30,
    height: 30,
    tintColor: Screens.grayShadeColor,
  },
  alignCenter: { justifyContent: "center", alignItems: "center" },
  label: {
    fontWeight: "bold",
    color: Screens.black,
  },
  category: {
    backgroundColor: Screens.pureWhite,
    padding: 10,
    marginTop: -160,
    marginHorizontal: 15,
    elevation: 5,
    borderRadius: 10,
    flex: 0.7,
    justifyContent: "space-between",
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 8,
    flexDirection: "row",
    backgroundColor: Screens.lightGray,
  },
  avatarImageContainer: {
    width: 25,
    height: 30,
    marginTop: 5,
  },
  avatarTextContainer: {
    fontSize: 13,
    fontWeight: "500",
  },
  cardContainer: {
    flex: 1,
    paddingVertical: 9,
    title: {
      color: Screens.grayShadeColor,
    },
  },
  textInputContainer: {
    borderRadius: 10,
    borderColor: Screens.colors.primary,
    borderWidth: 2,
    marginLeft: 10,
    marginTop: -2,
  },
});

export default Register;
