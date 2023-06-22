import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  AsyncStorage,
  ImageEditor,
  ImageStore,
} from "react-native";
import { RNCamera } from "react-native-camera";
import Button from "../../components/Button";

import axios from "axios";
import SuccessPopUp from "../../components/Loader";
import ModalView from "../../components/Modal";
import { LocalImages } from "../../constants/imageUrlConstants";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useFetch } from "../../hooks/use-fetch";
import { Dropdown } from "react-native-element-dropdown";
import CheckBox from "@react-native-community/checkbox";

import { Screens } from "../../themes/index";
import {
  serviceProviderApi,
  QrcodeApis,
  generateCredientials,
  ssiApiKey,
  alertBox,
  newssiApiKey,
} from "../../utils/earthid_account";
import QrScannerMaskedWidget from "../Camera/QrScannerMaskedWidget";
import { createUserSignature, saveDocuments } from "../../redux/actions/authenticationAction";
import { IDocumentProps } from "../uploadDocuments/VerifiDocumentScreen";
import GenericText from "../../components/Text";
import Loader from "../../components/Loader";
import { isEarthId } from "../../utils/PlatFormUtils";
import { dateTime } from "../../utils/encryption";
import { ICreateUserSignature } from "../../typings/AccountCreation/ICreateUserSignature";
import RNFetchBlob from 'rn-fetch-blob';



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
    loading: serviceProviderLoading,
    data: serviceProviderResponse,
    fetch: serviceProviderFetch,
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
    loading: sendDatatoServiceProviderLoading,
    fetch: sendDatatoServiceProvider,
    data: sendDatatoServiceProviderData,
  } = useFetch();

  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.account);
  const keys = useAppSelector((state) => state.user);
  const [successResponse, setsuccessResponse] = useState(false);
  const [isCameraVisible, setIsCamerVisible] = useState(true);
  const [isDocumentModal, setisDocumentModal] = useState(false);
  const documentsDetailsList = useAppSelector((state) => state.Documents);
  const [selectedCheckBox, setselectedCheckBox] = useState(
    documentsDetailsList.responseData
  );
  const [issuerSchemaJSON, setissuerSchemaJSON] = useState();
  const [issuerSchemaName, setissuerSchemaName] = useState([{}]);
  const [issuerSchemaDropDown, setissuerSchemaDropDown] = useState(false);
  const [selectedSchema, setselectedSchema] = useState();
  const [loadingforGentSchemaAPI, setloadingforGentSchemaAPI] = useState(false);
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

  const [createSignatureKey, setCreateSignatureKey] = useState();


  const issurDid = keys?.responseData?.issuerDid
  const UserDid  = keys?.responseData?.newUserDid  
  const privateKey = keys?.responseData?.generateKeyPair?.privateKey

  console.log("issuerDid",keys?.responseData)
  console.log("issuerDid",keys?.responseData?.issuerDid)
  console.log("UserDid",keys?.responseData?.newUserDid)
  console.log("privatekey",keys?.responseData?.generateKeyPair?.privateKey)
  console.log("createSignatureKey",createSignatureKey)

  let url : any  = `https://ssi-test.myearth.id/api/user/sign?issuerDID=${issurDid}`
  let key = privateKey
  var base64Pic = documentsDetailsList?.responseData ? documentsDetailsList?.responseData[0]?.base64 : null
  console.log("baseee",base64Pic)

  console.log("url===>",url)

  useEffect(()=>{

  // generateUserSignature()
    getKey()
    

  },[createSignatureKey])

  const generateUserSignature = async () =>{
    try {
      const data = {
        payload: {
          credentialSubject: {
            id:UserDid
          }
        }
      };
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "privateKey":privateKey,
          "x-api-key": newssiApiKey
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(async(responseData) => {
          // Handle the response data
          console.log("responseDataSignature",responseData);
          let signatureKey = await responseData?.Signature
          setCreateSignatureKey(signatureKey)
          await AsyncStorage.setItem("signatureKey",signatureKey)
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });
    
    } catch (error: any) {
      console.log("error", error?.message);
    }
  }


const getKey = async ()=>{
// let newKey : any = await  AsyncStorage.getItem("signatureKey")
// setCreateSignatureKey(newKey)
// console.log("signatureKey",newKey)
}

  const _handleBarCodeRead = (barCodeData: any) => {
    let serviceData = JSON.parse(barCodeData.data);
    console.log("barcodedata", serviceData);
    if (!serviceProviderLoading) {
      setbarCodeData(serviceData);

      if (serviceData.requestType === "login") {
        serviceProviderApiCall(serviceData);
      }
      if (serviceData.requestType === "generateCredentials") {
        serviceProviderApiCall(serviceData);
      }
      if (serviceData.requestType === "document") {
        serviceProviderApiCall(serviceData);
      }
      if (serviceData.requestType === "shareCredentials") {
        serviceProviderApiCall(serviceData);
      }
    }
    setIsCamerVisible(false);
  };
  useEffect(() => {
    const selectedCheckBoxs = documentsDetailsList?.responseData?.map(
      (item: { selectedForCheckBox: boolean }, index: any) => {
        item.selectedForCheckBox = true;
        return item;
      }
    );
    setselectedCheckBox(selectedCheckBoxs);
  }, [isDocumentModalkyc]);
  //service provider API responses handled
  useEffect(() => {
    if (
      serviceProviderResponse &&
      serviceProviderResponse?.values &&
      serviceProviderResponse?.values?.length > 0
    ) {
      setisDocumentModalkyc(false);

      if (barCodeDataDetails?.requestType === "login") {
        setTimeout(() => {
          setissuerLogin(true);
        }, 100);
      } else if (barCodeDataDetails?.requestType === "shareCredentials") {
        setisDocumentModalkyc(true);
      } else if (barCodeDataDetails?.requestType === "document") {
        setisDocumentModalkyc(true);
      } else if (barCodeDataDetails?.requestType === "generateCredentials") {
        setisDocumentModalkyc(true);
      }
    }
  }, [serviceProviderResponse]);

  useEffect(() => {
    console.log(
      "sendDatatoServiceProviderData==>",
      sendDatatoServiceProviderData
    );
    if (sendDatatoServiceProviderData) {
      //passwordless login flow
      setisDocumentModalkyc(false);
      if (barCodeDataDetails?.requestType === "login") {
        setIsCamerVisible(true);
        Alert.alert("Login Successfully");
      }
      if (barCodeDataDetails?.requestType === "generateCredentials") {
        setIsCamerVisible(true);
      }
      if (barCodeDataDetails?.requestType === "shareCredentials") {
        setIsCamerVisible(true);
        Alert.alert("credential has been shared successfully");
      }
      if (barCodeDataDetails?.requestType === "document") {
        setIsCamerVisible(true);
      }
    }
  }, [sendDatatoServiceProviderData]);

  useEffect(() => {
    return () => {
      setIsCamerVisible(true);
      setisDocumentModalkyc(false);
    };
  }, []);

  useEffect(() => {
    console.log("sharecredientials", shareCredientialData);
    if (shareCredientialData?.status === "success") {
      setisDocumentModalkyc(false);
      props.navigation.goBack(null);
    }
  }, [shareCredientialData]);
  const getSchemeDetails = () => {
    setisDocumentModalkyc(false);
    getData();
  };
  const getDropDownList = () => {
    let datas = [];
    datas = documentsDetailsList?.responseData;
    if (barCodeDataDetails?.requestType === "shareCredentials") {
      datas = datas?.filter((item: { isVc: any; }) => item.isVc);
      return datas;
    }
    return datas;
  };

  

  const createVerifiableCredentials = async () => {
    generateUserSignature()
    getData();
    setloadingforGentSchemaAPI(true);
  
    if (barCodeDataDetails?.requestType === "document") {
      var date = dateTime();
      var documentDetails: IDocumentProps = {
        id: `ID_VERIFICATION${Math.random()}${"selectedDocument"}${Math.random()}`,
        name: "VC - ACK Token",
        path: "filePath",
        date: date?.date,
        time: date?.time,
        txId: "data?.result",
        docType: "pdf",
        docExt: ".jpg",
        processedDoc: "",
        isVc: true,
        vc: JSON.stringify({
          name: "VC - ACK Token",
          documentName: "VC - ACK Token",
          path: "filePath",
          date: date?.date,
          time: date?.time,
          txId: "data?.result",
          docType: "pdf",
          docExt: ".jpg",
          processedDoc: "",
          isVc: true,
        }),
        documentName: "",
        docName: "",
        base64: undefined
      //  base64: base64Pic
       
      };

      var DocumentList = documentsDetailsList?.responseData
        ? documentsDetailsList?.responseData
        : [];

      DocumentList.push(documentDetails);
      dispatch(saveDocuments(DocumentList));

      setIsCamerVisible(true);
      setTimeout(() => {
        setloadingforGentSchemaAPI(false);
        setissuerSchemaDropDown(false);
    //    Alert.alert("KYC token Saved successfully");
        Alert.alert("ACK token Saved successfully");
        props.navigation.navigate("Documents");
      }, 3000);
    } else if (barCodeDataDetails.requestType === "shareCredentials") {
      // getData();
    } else {
      var date = dateTime();
      var documentDetails: IDocumentProps = {
        id: `ID_VERIFICATION${Math.random()}${"selectedDocument"}${Math.random()}`,
        name: "Membership Credientials",
        documentName: "Membership Credientials",
        path: "filePath",
        date: date?.date,
        time: date?.time,
        txId: "data?.result",
        docType: "pdf",
        docExt: ".jpg",
        processedDoc: "",
        isVc: true,
        vc: JSON.stringify({
          name: "Membership Credientials",
          documentName: "Membership Credientials",
          path: "filePath",
          date: date?.date,
          time: date?.time,
          txId: "data?.result",
          docType: "pdf",
          docExt: ".jpg",
          processedDoc: "",
          isVc: true,
        }),
        docName: "",
        base64: undefined
     //   base64: base64Pic,
        
      };

      var DocumentList = documentsDetailsList?.responseData
        ? documentsDetailsList?.responseData
        : [];

      DocumentList.push(documentDetails);
      console.log("documentsDetailsList", documentsDetailsList);
      dispatch(saveDocuments(DocumentList));

      setIsCamerVisible(true);
      setTimeout(() => {
        setloadingforGentSchemaAPI(false);
        setissuerSchemaDropDown(false);
        Alert.alert("Membership Credential Saved successfully");
        props.navigation.navigate("Documents");
      }, 3000);
    }
  };

  const serviceProviderApiCall = (serviceData: any) => {
    const { apikey, reqNo, requestType } = serviceData;
    console.log(
      "getUrl===>>>::::",
      `${serviceProviderApi}?apikey=${apikey}&reqNo=${reqNo}&requestType=${requestType}`
    );
    serviceProviderFetch(
      `${serviceProviderApi}?apikey=${apikey}&reqNo=${reqNo}&requestType=${requestType}`,
      {},
      "GET"
    );
  };
  const shareCredientials = () => {
    getSchemeDetails();
  };

  const navigateToCamerScreen = () => {
    setisDocumentModalkyc(false);
    setIsCamerVisible(true);
    props.navigation.navigate("uploadDocumentsScreen");
  };

  const checkDisable = () => {
    let trap = false;
    if (
      documentsDetailsList?.responseData?.length === 0 ||
      documentsDetailsList?.responseData === undefined
    ) {
      trap = true;
    }
    if (
      selectedCheckBox?.some(
        (item: { selectedForCheckBox: boolean }) =>
          item?.selectedForCheckBox === true
      )
    ) {
      trap = false;
    }
    return trap;
  };

  const getData = () => {
    console.log("userDetails", userDetails);
    if (barCodeDataDetails) {
      let data;
      if (barCodeDataDetails?.requestType === "login") {
        console.log("type===>","login")
        data = {
          sessionKey: barCodeDataDetails?.sessionKey,
          encrypted_object: {
            earthId: userDetails?.responseData?.earthId,
            pressed: false,
            userName: userDetails?.responseData?.username,
            userEmail: userDetails?.responseData?.email,
            userMobileNo: userDetails?.responseData?.phone,
            publicKey:keys?.responseData?.result?.publicKey,
            userDid:keys?.responseData?.newUserDid 
          },         
        };
      } else if (barCodeDataDetails?.requestType === "generateCredentials") {
        console.log("type===>","generateCredentials")
        data = {
          sessionKey: barCodeDataDetails?.sessionKey,
          encrypted_object: {
            earthId: userDetails?.responseData?.earthId,
            pressed: false,
            publicKey:keys?.responseData?.result?.publicKey,
            userDid:keys?.responseData?.newUserDid ,
          //   signature:createSignatureKey,
          //   base64:base64Pic,
          //  pdf :documentsDetailsList?.responseData[0]?.typePDF,
          //  docName :documentsDetailsList?.responseData[0]?.docName,
          },
        };
      } else if (barCodeDataDetails?.requestType === "document") {
        console.log("type===>","document")
        data = {
          sessionKey: barCodeDataDetails?.sessionKey,
          encrypted_object: {
            earthId: userDetails?.responseData?.earthId,
            pressed: false,
            userName: userDetails?.responseData?.username,
            userEmail: userDetails?.responseData?.email,
            userMobileNo: userDetails?.responseData?.phone,
            OrganizationID: userDetails?.responseData?.orgId,
            // countryCode: userDetails?.responseData?.countryCode,
            // emailVerified: userDetails?.responseData?.emailVerified,
            // mobileVerified: userDetails?.responseData?.mobileVerified,
            //documents: documentsDetailsList?.responseData,
            requestType: barCodeDataDetails?.requestType,
            reqNo: barCodeDataDetails?.reqNo,
            kycToken:
              "6hrFDATxrG9w14QY9wwnmVhLE0Wg6LIvwOwUaxz761m1JfRp4rs8Mzozk5xhSkw0_MQz6bpcJnrFUDwp5lPPFC157dHxbkKlDiQ9XY3ZIP8zAGCsS8ruN2uKjIaIargX",
              publicKey:keys?.responseData?.result?.publicKey,
              userDid:keys?.responseData?.newUserDid ,
            //   pdf :documentsDetailsList?.responseData[0]?.typePDF,
            //   docName :documentsDetailsList?.responseData[0]?.docName,
            //  signature:createSignatureKey,
            //   base64:base64Pic,
           
          },
        };
      } else if (barCodeDataDetails.requestType === "shareCredentials") {
        console.log("type===>","shareCredentials")
        data = {
          sessionKey: barCodeDataDetails?.sessionKey,
          encrypted_object: {
            earthId: userDetails?.responseData?.earthId,
            pressed: false,
            userName: userDetails?.responseData?.username,
            userEmail: userDetails?.responseData?.email,
            userMobileNo: userDetails?.responseData?.phone,
            OrganizationID: userDetails?.responseData?.orgId,
            // countryCode: userDetails?.responseData?.countryCode,
            // emailVerified: userDetails?.responseData?.emailVerified,
            // mobileVerified: userDetails?.responseData?.mobileVerified,
            //documents: documentsDetailsList?.responseData,
            requestType: barCodeDataDetails?.requestType,
            reqNo: barCodeDataDetails?.reqNo,
           // signature:createSignatureKey,
          //   base64:base64Pic,
          //  pdf :documentsDetailsList?.responseData[0]?.typePDF,
          //  docName :documentsDetailsList?.responseData[0]?.docName,
            kycToken:
              "6hrFDATxrG9w14QY9wwnmVhLE0Wg6LIvwOwUaxz761m1JfRp4rs8Mzozk5xhSkw0_MQz6bpcJnrFUDwp5lPPFC157dHxbkKlDiQ9XY3ZIP8zAGCsS8ruN2uKjIaIargX",
          },
        };
      }
      console.log("getSignature",data)
      sendDatatoServiceProvider(QrcodeApis, data, "POST");
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
      {isCameraVisible && (
        <RNCamera
          style={styles.preview}
          androidCameraPermissionOptions={null}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          onBarCodeRead={(data) => _handleBarCodeRead(data)}
        >
          <QrScannerMaskedWidget />
        </RNCamera>
      )}

      <SuccessPopUp
        isLoaderVisible={successResponse}
        loadingText={successMessage}
      />
      <ModalView
        width={deviceWidth / 1.45}
        height={350}
        isModalVisible={issuerLogin}
      >
        <View
          style={{
            flex: 1,

            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isEarthId()
                ? Screens.colors.ScanButton.startColor
                : "#fff",
            }}
          >
            <Image
              resizeMode="contain"
              style={[styles.imageLogo]}
              source={LocalImages.logoImage}
            ></Image>
          </View>
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
            {"plsauthorizeit"}
          </GenericText>
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
          <View style={{ marginTop: -20 }}>
            <Button
              onPress={() => {
                setIsCamerVisible(true);
                setissuerLogin(false);
              }}
              style={{
                buttonContainer: {
                  elevation: 5,
                  marginHorizontal: 10,
                  backgroundColor: "red",
                },
                text: {
                  color: Screens.pureWhite,
                  fontSize: 12,
                },
                iconStyle: {
                  tintColor: Screens.pureWhite,
                },
              }}
              title={"cancel"}
            ></Button>
          </View>
        </View>
      </ModalView>

      <ModalView
        left={deviceWidth / 9}
        width={deviceWidth / 1.2}
        height={500}
        isModalVisible={isDocumentModalkyc}
      >
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
          {documentsDetailsList?.responseData?.length === 0 ||
            (documentsDetailsList?.responseData === undefined && (
              <TouchableOpacity onPress={() => navigateToCamerScreen()}>
                <View style={{ paddingHorizontal: 5, marginTop: 10 }}>
                  <GenericText
                    style={{
                      textAlign: "center",
                      color: Screens.colors.ScanButton.startColor,
                      fontSize: 14,
                      fontWeight: "900",
                    }}
                  >
                    {"+ Add Documents"}
                  </GenericText>
                </View>
              </TouchableOpacity>
            ))}
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
            {isEarthId() ? "earthidwanttoaccess" : "globalidwanttoaccess"}
          </GenericText>
          <View style={{ height: 300 }}>
            <ScrollView
              style={{ flexGrow: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View>
                {getDropDownList() &&
                  getDropDownList().length > 0 &&
                  getDropDownList()?.map(
                    (
                      item: {
                        documentName: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
                        id: any;
                        name:
                          | boolean
                          | React.ReactChild
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                      },
                      index: any
                    ) => {
                      console.log('item',item)
                      return (
                        <View
                          style={{ flexDirection: "row", marginVertical: 10 }}
                        >
                          <CheckBox
                            disabled={false}
                            onValueChange={(value) => {
                              const selectedCheckBoxs = selectedCheckBox?.map(
                                (
                                  itemLocal: {
                                    id: any;
                                    selectedForCheckBox: boolean;
                                  },
                                  index: any
                                ) => {
                                  if (itemLocal?.id === item?.id) {
                                    itemLocal.selectedForCheckBox =
                                      !itemLocal.selectedForCheckBox;
                                  }

                                  return itemLocal;
                                }
                              );
                              setselectedCheckBox([...selectedCheckBoxs]);
                            }}
                            value={
                              selectedCheckBox && selectedCheckBox.length > 0
                                ? selectedCheckBox[index]?.selectedForCheckBox
                                : false
                            }
                          />
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <GenericText
                              style={{
                                textAlign: "center",
                                padding: 5,
                                color: "#000",
                                fontSize: 14,
                                fontWeight: "300",
                              }}
                            >
                              {item.name || item?.documentName}
                            </GenericText>
                          </View>
                        </View>
                      );
                    }
                  )}
              </View>
            </ScrollView>

            <GenericText
              style={{
                textAlign: "center",
                padding: 5,
                color: "#000",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {"Selected Duration"}
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
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 50,
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setisDocumentModalkyc(false);
                setIsCamerVisible(true);
              }}
            >
              <GenericText
                style={{ color: "red", fontSize: 16, fontWeight: "700" }}
              >
                Cancel
              </GenericText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ opacity: checkDisable() ? 0.5 : 1 }}
              disabled={checkDisable()}
              onPress={createVerifiableCredentials}
            >
              <GenericText
                style={{ color: "green", fontSize: 16, fontWeight: "700" }}
              >
                {"authorize"}
              </GenericText>
            </TouchableOpacity>
          </View>
        </View>
      </ModalView>

      <Loader
        loadingText={
          barCodeDataDetails?.requestType === "generateCredentials"
            ? "credential generated successfully"
            : "Login successfully"
        }
        Status="Success !"
        isLoaderVisible={false}
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
