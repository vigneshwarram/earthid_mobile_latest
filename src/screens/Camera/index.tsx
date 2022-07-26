import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";
import Button from "../../components/Button";
import SuccessPopUp from "../../components/Loader";
import AnimatedLoader from "../../components/Loader/AnimatedLoader";
import ModalView from "../../components/Modal";
import { LocalImages } from "../../constants/imageUrlConstants";
import { useAppSelector } from "../../hooks/hooks";
import { useFetch } from "../../hooks/use-fetch";
import { useSendData } from "../../hooks/use-sendData";
import { Screens } from "../../themes/index";
import CryptoJS from "react-native-crypto-js";
import { serviceProviderApi, userDataApi } from "../../utils/earthid_account";
import QrScannerMaskedWidget from "../Camera/QrScannerMaskedWidget";

const CameraScreen = (props: any) => {
  const {
    loading: issuerLoading,
    data: issuerDataResponse,
    error: issuerError,
    fetch: issuerFetch,
  } = useFetch();
  const {
    loading: sendDataLoading,
    data: sendDataResponseData,
    error: sendDataError,
    fetch: sendDataFetch,
  } = useSendData();
  const contractDetails = useAppSelector((state) => state.contract);
  const [successResponse, setsuccessResponse] = useState(false);
  const [issuerLogin, setissuerLogin] = useState(false);
  const [barCodeDataDetails, setbarCodeData] = useState<any>();
  const _handleBarCodeRead = (barCodeData: any) => {
    let serviceData = JSON.parse(barCodeData.data);
    console.log("contractDetails", contractDetails);
    const { apikey, reqNo, requestType } = serviceData;
    setbarCodeData(serviceData);
    let params = {
      apikey: apikey,
      reqNo: reqNo,
      requestType: requestType,
    };

    if (serviceData.requestType === "login") {
      issuerFetch(
        `${serviceProviderApi}?apikey=${apikey}&reqNo=${reqNo}&requestType=${requestType}`,
        {},
        "GET"
      );
    }
  };
  useEffect(() => {
    if (issuerDataResponse?.status === "success") {
      console.log("issuerData", issuerDataResponse);
      setissuerLogin(true);
    }
  }, [issuerDataResponse]);

  const getData = () => {
    if (barCodeDataDetails) {
      const encrypted_object = {
        earthId: contractDetails?.responseData?.earthId,
        fname: contractDetails?.responseData?.name,
        userEmail: contractDetails?.responseData?.email,
        userMobileNo: contractDetails?.responseData?.mobile,
        emailVerified: contractDetails?.responseData?.emailApproved,
        trustScore: "33",
        mobileVerified: contractDetails?.responseData?.mobileApproved,
        pressed: false,
        dob: "22/02/1995",
        requestType: "login",
        duration: "220",
        documents: [],
      };
      console.log("encrypted_object", encrypted_object);
      let ciphertext: any = CryptoJS.AES.encrypt(
        JSON.stringify(encrypted_object),
        barCodeDataDetails?.encryptionkey
      ).toString();
      let data = {
        reqNo: barCodeDataDetails.reqNo,
        testnet: true,
        encrypted_object: {
          ciphertext,
          earthId: contractDetails?.responseData?.earthId,
        },
      };
      sendDataFetch(userDataApi, data, "POST");
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={{ position: "absolute", top: 20, left: 20, zIndex: 100 }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("DrawerStacks", {
              screen: "ShowQrScreen",
            })
          }
        >
          <Image
            resizeMode="contain"
            style={[styles.logoContainer]}
            source={LocalImages.scanbarImage}
          ></Image>
        </TouchableOpacity>
      </View>

      <RNCamera
        style={styles.preview}
        androidCameraPermissionOptions={null}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        onBarCodeRead={(data) =>
          !issuerLoading && !issuerDataResponse && _handleBarCodeRead(data)
        }
      >
        <QrScannerMaskedWidget />
      </RNCamera>
      <AnimatedLoader
        isLoaderVisible={issuerLoading || sendDataLoading}
        loadingText="verifying..."
      />
      <SuccessPopUp
        isLoaderVisible={successResponse}
        loadingText={"Verification succeeded"}
      />
      <ModalView isModalVisible={issuerLogin}>
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              resizeMode="contain"
              style={[styles.imageLogo]}
              source={LocalImages.logoImage}
            ></Image>
          </View>

          <Button
            onPress={() => {
              setissuerLogin(false);
              getData();
            }}
            style={{
              buttonContainer: {
                elevation: 5,
              },
              text: {
                color: Screens.pureWhite,
                fontSize: 12,
              },
              iconStyle: {
                tintColor: Screens.pureWhite,
              },
            }}
            title={"Authorize"}
          ></Button>
        </View>
      </ModalView>
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
  imageLogo: {
    width: 120,
    height: 120,
  },
});

export default CameraScreen;
