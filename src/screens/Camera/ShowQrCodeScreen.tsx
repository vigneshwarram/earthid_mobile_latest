import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "../../components/Button";
import { LocalImages } from "../../constants/imageUrlConstants";
import { Screens } from "../../themes/index";
import QRCode from "react-native-qrcode-svg";
import { SCREENS } from "../../constants/Labels";

const CameraScreen = (props: any) => {
  const _handleBarCodeRead = (barCodeData: any) => {};

  return (
    <View style={styles.sectionContainer}>
      <View
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 100,
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ShowQrScreen")}
        >
          <Image
            resizeMode="contain"
            style={[styles.logoContainer]}
            source={LocalImages.qrscanImage}
          ></Image>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 100,
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            resizeMode="contain"
            style={[
              styles.logoContainer,
              { tintColor: Screens.pureWhite, width: 15, height: 15 },
            ]}
            source={LocalImages.closeImage}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.category}>
        <View style={{ flex: 0.8, justifyContent: "space-between" }}>
          <Text
            style={[
              styles.categoryHeaderText,
              {
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center",
                color: Screens.pureWhite,
              },
            ]}
          >
            {"Robert Downey"}
          </Text>
          <Text
            style={[
              styles.categoryHeaderText,
              {
                fontSize: 14,
                fontWeight: "500",
                textAlign: "center",
                color: Screens.colors.primary,
              },
            ]}
          >
            {"ID: 37578810"}
          </Text>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <QRCode
              //QR code value
              value={"NA"}
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
          <Text
            style={[
              styles.categoryHeaderText,
              {
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center",
                color: Screens.pureWhite,
              },
            ]}
          >
            {"Share this code"}
          </Text>
          <Text
            style={[
              styles.categoryHeaderText,
              {
                fontSize: 14,
                fontWeight: "500",
                textAlign: "center",
                color: Screens.colors.primary,
              },
            ]}
          >
            {SCREENS.SHOWQRSCREEN.instruction}
          </Text>
        </View>
        <Button
          leftIcon={LocalImages.shareImage}
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
          title={"Share QR code"}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.black,
  },
  categoryHeaderText: {
    marginHorizontal: 20,
    marginVertical: 10,

    color: Screens.headingtextColor,
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  category: {
    padding: 10,
    marginTop: 100,
    marginHorizontal: 15,
    elevation: 5,
    borderRadius: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  logoContainer: {
    width: 30,
    height: 30,
  },
});

export default CameraScreen;
