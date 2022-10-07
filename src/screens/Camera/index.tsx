import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { RNCamera } from "react-native-camera";
import Button from "../../components/Button";
import SuccessPopUp from "../../components/Loader";
import AnimatedLoader from "../../components/Loader/AnimatedLoader";
import ModalView from "../../components/Modal";
import { LocalImages } from "../../constants/imageUrlConstants";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useFetch } from "../../hooks/use-fetch";
import { Dropdown } from "react-native-element-dropdown";
import CheckBox from "@react-native-community/checkbox";

import { Screens } from "../../themes/index";
import { serviceProviderApi, QrcodeApis } from "../../utils/earthid_account";
import QrScannerMaskedWidget from "../Camera/QrScannerMaskedWidget";
import { saveDocuments } from "../../redux/actions/authenticationAction";
import { IDocumentProps } from "../uploadDocuments/VerifiDocumentScreen";
import GenericText from "../../components/Text";
import Loader from "../../components/Loader";
const data = [
  { label: " 1", value: "1" },
  { label: " 2", value: "2" },
  { label: " 3", value: "3" },
  { label: " 4", value: "4" },
  { label: " 5", value: "5" },
  { label: " 6", value: "6" },
  { label: " 7", value: "7" },
  { label: " 8", value: "8" },
];
const deviceWidth = Dimensions.get("window").width;
const CameraScreen = (props: any) => {
  const {
    loading: issuerLoading,
    data: issuerDataResponse,
    fetch: issuerFetch,
  } = useFetch();
  const {
    loading: shareCredientialLoading,
    data: shareCredientialData,
    fetch: shareCredientialFetch,
  } = useFetch();

  const {
    loading: schemaLoding,
    data: schemaList,
    fetch: getScheme,
  } = useFetch();

  const {
    loading: sendDataLoading,
    fetch: sendDataFetch,
    data: sendData,
  } = useFetch();

  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.account);
  const [successResponse, setsuccessResponse] = useState(false);
  const [isDocumentModal, setisDocumentModal] = useState(false);
  const documentsDetailsList = useAppSelector((state) => state.Documents);
  const [value, setValue] = useState(null);
  const [isDocumentModalkyc, setisDocumentModalkyc] = useState(false);
  const [
    isDocumentModalGenerateCredientials,
    setisDocumentModalGenerateCredientials,
  ] = useState(false);
  const [checkbox1, setcheckbox1] = useState(true);
  const [checkbox2, setcheckbox2] = useState(true);
  const [issuerLogin, setissuerLogin] = useState(false);
  const [barCodeDataDetails, setbarCodeData] = useState<any>();
  const [successMessage, setsuccessMessage] = useState(
    "verification successfully"
  );
  const _handleBarCodeRead = (barCodeData: any) => {
    let serviceData = JSON.parse(barCodeData.data);
    console.log("serviceData", serviceData);
    const { apikey, reqNo, requestType } = serviceData;
    setbarCodeData(serviceData);

    if (serviceData.requestType === "login") {
      setissuerLogin(true);
    }
    if (serviceData.requestType === "document") {
      setisDocumentModal(true);
    }
    if (serviceData.requestType === "shareCredentials") {
      setisDocumentModalkyc(true);
    }
    if (serviceData.requestType === "generateCredentials") {
      setisDocumentModalkyc(true);
      // const { apikey, reqNo, requestType } = serviceData;
      // issuerFetch(
      //   `${serviceProviderApi}?apikey=${apikey}&reqNo=${reqNo}&requestType=${requestType}`,
      //   {},
      //   "GET"
      // );
    }
  };
  useEffect(() => {
    console.log("sharecredientials", shareCredientialData);
    if (shareCredientialData?.status === "success") {
      setisDocumentModalkyc(false);
      props.navigation.goBack(null);
    }
  }, [shareCredientialData]);
  const getSchemeDetails = () => {
    getScheme();
  };

  useEffect(() => {
    console.log("issuerDataResponse", issuerDataResponse);
    if (issuerDataResponse?.status === "success") {
      console.log("issuerData", issuerDataResponse);
      if (barCodeDataDetails?.requestType === "login") {
        props.navigation.navigate.goBack(null);
      } else if (barCodeDataDetails?.requestType === "generateCredentials") {
        setisDocumentModalGenerateCredientials(true);
      } else if (barCodeDataDetails?.requestType === "document") {
        setsuccessResponse(true);
        var documentDetails: IDocumentProps = {
          name: "VC - KYC Token",
          path: "filePath",
          date: "1/08/2022",
          time: "date?.time",
          txId: "data?.result",
          docType: "pdf",
          docExt: ".jpg",
          processedDoc: "",
          isVc: true,
          vc: JSON.stringify({
            name: "VC - KYC Token",
            path: "filePath",
            date: "1/08/2022",
            time: "date?.time",
            txId: "data?.result",
            docType: "pdf",
            docExt: ".jpg",
            processedDoc: "",
            isVc: true,
          }),
        };

        var DocumentList = documentsDetailsList?.responseData
          ? documentsDetailsList?.responseData
          : [];

        DocumentList.push(documentDetails);
        console.log("documentsDetailsList", documentsDetailsList);
        dispatch(saveDocuments(DocumentList));
        setsuccessMessage("KYC Token received");
        setTimeout(() => {
          setsuccessResponse(false);
          setisDocumentModal(false);
          setisDocumentModalkyc(false);
          props.navigation.navigate("Document");
        }, 2000);
      }
    }
  }, [issuerDataResponse]);

  const documentShare = () => {
    const { apikey, reqNo, requestType } = barCodeDataDetails;
    issuerFetch(
      `${serviceProviderApi}?apikey=${apikey}&reqNo=${reqNo}&requestType=${requestType}`,
      {},
      "GET"
    );
  };
  const shareCredientials = () => {
    getSchemeDetails();
  };

  const getData = () => {
    if (barCodeDataDetails) {
      let data = {
        sessionKey: barCodeDataDetails?.sessionKey,
        encrypted_object: {
          earthId: userDetails?.responseData?.earthId,
          pressed: false,
        },
      };
      console.log("data==>", data);
      sendDataFetch(QrcodeApis, data, "POST").then(() => {
        props.navigation.navigate("Home");
      });
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
          !issuerLoading && !issuerLogin && _handleBarCodeRead(data)
        }
      >
        <QrScannerMaskedWidget />
      </RNCamera>
      <AnimatedLoader
        isLoaderVisible={issuerLoading || sendDataLoading}
        loadingText="sendingdata"
      />
      <SuccessPopUp
        isLoaderVisible={successResponse}
        loadingText={successMessage}
      />
      <ModalView height={250} isModalVisible={issuerLogin}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 5,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#8059D0",
              width: deviceWidth / 1.5,
            }}
          >
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
                marginHorizontal: 10,
              },
              text: {
                color: Screens.pureWhite,
                fontSize: 12,
              },
              iconStyle: {
                tintColor: Screens.pureWhite,
              },
            }}
            title={"authorize"}
          ></Button>
        </View>
      </ModalView>
      <ModalView
        left={deviceWidth / 9}
        width={deviceWidth / 1.2}
        height={380}
        isModalVisible={isDocumentModal}
      >
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
          <GenericText
            style={{
              textAlign: "center",
              padding: 5,
              color: "#000",
              fontSize: 14,
              fontWeight: "900",
              marginTop: 20,
            }}
          >
            {"earthidwanttoaccess"}
          </GenericText>
          <View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <CheckBox
                disabled={false}
                onValueChange={(value) => {
                  setcheckbox1(value);
                }}
                value={checkbox1}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <GenericText
                  style={{
                    textAlign: "center",
                    padding: 5,
                    color: "#000",
                    fontSize: 14,
                    fontWeight: "300",
                  }}
                >
                  {"drivinglicense"}
                </GenericText>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <CheckBox
                onValueChange={(value) => {
                  setcheckbox2(value);
                }}
                disabled={false}
                value={checkbox2}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <GenericText
                  style={{
                    textAlign: "center",
                    padding: 5,
                    color: "#000",
                    fontSize: 14,
                    fontWeight: "300",
                  }}
                >
                  {"nationalidcard"}
                </GenericText>
              </View>
            </View>
          </View>
          <GenericText
            style={{
              textAlign: "center",
              padding: 5,
              color: "#000",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {"duration"}
          </GenericText>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={"Expiry Time (default 1 day)"}
            searchPlaceholder="Search..."
            value={"value"}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 50,
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity onPress={() => setisDocumentModal(false)}>
              <GenericText
                style={{ color: "red", fontSize: 16, fontWeight: "700" }}
              >
                {"cancel"}
              </GenericText>
            </TouchableOpacity>
            <TouchableOpacity onPress={documentShare}>
              <GenericText
                style={{ color: "green", fontSize: 16, fontWeight: "700" }}
              >
                {"authorize"}
              </GenericText>
            </TouchableOpacity>
          </View>
        </View>
      </ModalView>

      <ModalView
        left={deviceWidth / 9}
        width={deviceWidth / 1.2}
        height={300}
        isModalVisible={isDocumentModalkyc}
      >
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
          <GenericText
            style={{
              textAlign: "center",
              padding: 5,
              color: "#000",
              fontSize: 14,
              fontWeight: "900",
              marginTop: 20,
            }}
          >
            {"globalidwanttoaccess"}
          </GenericText>
          <View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <CheckBox
                disabled={false}
                onValueChange={(value) => {
                  setcheckbox1(value);
                }}
                value={checkbox1}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <GenericText
                  style={{
                    textAlign: "center",
                    padding: 5,
                    color: "#000",
                    fontSize: 14,
                    fontWeight: "300",
                  }}
                >
                  {"kyctoken"}
                </GenericText>
              </View>
            </View>
          </View>
          <GenericText
            style={{
              textAlign: "center",
              padding: 5,
              color: "#000",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {"duration"}
          </GenericText>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={"Expiry Time (default 1 day)"}
            searchPlaceholder="Search..."
            value={"value"}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 50,
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity onPress={() => setisDocumentModalkyc(false)}>
              <Text style={{ color: "red", fontSize: 16, fontWeight: "700" }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={shareCredientials}>
              <Text style={{ color: "green", fontSize: 16, fontWeight: "700" }}>
                Authorize
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalView>

      <ModalView
        left={deviceWidth / 9}
        width={deviceWidth / 1.2}
        height={300}
        isModalVisible={isDocumentModalGenerateCredientials}
      >
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
          <GenericText
            style={{
              textAlign: "center",
              padding: 5,
              color: "#000",
              fontSize: 14,
              fontWeight: "900",
              marginTop: 20,
            }}
          >
            {"Select anyone type to Generate Credentials"}
          </GenericText>
          <View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <CheckBox
                disabled={false}
                onValueChange={(value) => {
                  setcheckbox1(value);
                }}
                value={checkbox1}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <GenericText
                  style={{
                    textAlign: "center",
                    padding: 5,
                    color: "#000",
                    fontSize: 14,
                    fontWeight: "300",
                  }}
                >
                  {"Encrypt Credentials  "}
                </GenericText>
              </View>
            </View>
          </View>
          <GenericText
            style={{
              textAlign: "center",
              padding: 5,
              color: "#000",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {"duration"}
          </GenericText>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={"Expiry Time (default 1 day)"}
            searchPlaceholder="Search..."
            value={"value"}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 50,
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => setisDocumentModalGenerateCredientials(false)}
            >
              <Text style={{ color: "red", fontSize: 16, fontWeight: "700" }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={shareCredientials}>
              <Text style={{ color: "green", fontSize: 16, fontWeight: "700" }}>
                Authorize
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalView>
      <Loader
        loadingText="Login successfully"
        Status="Success !"
        isLoaderVisible={sendDataLoading}
      ></Loader>
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
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  imageLogo: {
    width: 120,
    height: 120,
  },
});

export default CameraScreen;
