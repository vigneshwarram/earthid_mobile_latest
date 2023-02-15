import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Platform, Alert } from "react-native";

import Button from "../../components/Button";
import SuccessPopUp from "../../components/Loader";
import AnimatedLoader from "../../components/Loader/AnimatedLoader";
import { LocalImages } from "../../constants/imageUrlConstants";
import { useFetch } from "../../hooks/use-fetch";
import { Screens } from "../../themes/index";
import { BASE_URL, superAdminApi, uploadDocument, uploadRegisterDocument } from "../../utils/earthid_account";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import PDFView from "react-native-view-pdf";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Loader from "../../components/Loader/AnimatedLoader";
import { createAccount, GeneratedKeysAction } from "../../redux/actions/authenticationAction";
import { getDeviceId, getDeviceName } from "../../utils/encryption";
import { IUserAccountRequest } from "../../typings/AccountCreation/IUserAccount";
import { SnackBar } from "../../components/SnackBar";
import { isArray } from "lodash";
import { isEarthId } from "../../utils/PlatFormUtils";

const DocumentPreviewScreen = (props: any) => {
  const { fileUri } = props.route.params;
  const { type } = props.route.params;
  const dispatch = useAppDispatch();
  const { newdata } = props.route.params;
  const keys = useAppSelector((state) => state.user);
  const userDetails = useAppSelector((state) => state.account);
  const { loading, data, error, fetch: uploadRegDoc } = useFetch();
  const [documentResponseData,setDocumentResponse]=useState(undefined);
  const {
    loading: superAdminLoading,
    data: superAdminResponse,
    fetch: getSuperAdminApiCall,
  } = useFetch();
  const [loginLoading, setLoginLoading] = useState(false);
  const [successResponse, setsuccessResponse] = useState(false);
  const [message, Setmessage] = useState("ooo");
  const [datas, SetData] = useState(null);
  const [source, setSource] = useState({});
  const [filePath, setFilePath] = useState();
  const {
    loading: getUserLoading,
    data: getUserResponse,
    error: getUserError,
    fetch: getUser,
  } = useFetch();
  console.log('fileUri===>',fileUri?.type)
  const resources = {
    file:
      Platform.OS === "ios"
        ? "documentDetails?.base64"
        : "/sdcard/Download/test-pdf.pdf",
    url: fileUri?.base64,
    base64: fileUri?.base64,
  };
  const resourceType = "base64";

  console.log('error===>',error)
useEffect(()=>{
  if(error){
    setLoginLoading(false)
    Alert.alert("Alert","Document not supported")
  }

},[error])

  function alertUploadDoc(){
    Alert.alert(
      'Confirmation!',
      'Please confirm that this is a self-attested document',
      [
        
        {
          text: 'Yes',
          onPress: () =>{ 
            if(type=="regDoc"){
              uploadDocumentImage()
            }else{
              uploadDoc()
            }
           
          },
          style: 'cancel',
        },
        {
          text: 'No', 
          onPress: () =>{
            if(type=="regDoc"){
              uploadDocumentImage()
            }else{
              uploadDoc()
            }
          }
        },
      ],
      {cancelable: false},
    );
  }

  const uploadDoc = async () => {
    let type = "qrRreader";

    if (!type == fileUri.type) {
      setFilePath(fileUri?.file?.uri);

      if (filePath) {
        props.navigation.navigate("DrawerNavigator", { fileUri });
      }
    } else {
        props.navigation.navigate("categoryScreen", { fileUri });
        console.log("success==>", "Success");
      
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  //Qr Code Reader From the image

  // useEffect(() => {
  //   if (data) {
  //     setsuccessResponse(true);
  //     setTimeout(() => {
  //       setsuccessResponse(false);
  //       props.navigation.navigate("categoryScreen", { fileUri });
  //     }, 3000);
  //   }
  //   console.log("filename==>", fileUri?.file?.type);
  // }, [data]);


  function uploadDocumentImage(){

    console.log("DocumentImage:::::",fileUri)

    if(type=="regDoc"){

      let image={
        uri: fileUri.uri,
        name:fileUri.filename,
        type:fileUri.type
      }
      try{
        setLoginLoading(true)
         uploadRegDoc(uploadRegisterDocument,image,"FORM-DATA");
  
       
       // props.navigation.navigate("DrawerNavigator", { response });
      }catch(e){
        setLoginLoading(false)
        console.log("DocumentError:::::",e)
        console.log("DocumentError:::::","ERROR")
      }

    }
  }
  useEffect(() => {
    getSuperAdminApiCall(superAdminApi, {}, "GET");
  }, []);

 useEffect(()=>{
  if(data){
    if(data?.data){
      setDocumentResponse(data?.data)
      dispatch(GeneratedKeysAction());
     }
  }
 },[data])

  const createPayLoadFromDocumentData=(documentResponseData:any)=>{
    console.log('slsls',documentResponseData?.ProcessedDocuments[0].ExtractedFields?.filter((item:any)=>item.Name==='FullName')[0])
    const username =documentResponseData?.ProcessedDocuments[0].ExtractedFields?.filter((item:any)=>item.Name==='FullName')[0]?.Value;
    const trimmedEmail =documentResponseData?.ProcessedDocuments[0].ExtractedFields?.filter((item:any)=>item.Name==='FullName')[0]?.Value+"ex"+Math.random()+"@gmail.com";
    let email = trimmedEmail.trim().replace(/\s+/g, ' ');
    let phone = Math.floor(Math.random() * Math.pow(10, 10)).toString().padStart(10, '0');
 return {
  username,
  email,
  phone
 }
  }
  const _registerAction = async ({ publicKey }: any) => {
    if(documentResponseData){
      const token = await getDeviceId();
      const deviceName = await getDeviceName();
      const payLoadCreation =createPayLoadFromDocumentData(documentResponseData);
      if (superAdminResponse && superAdminResponse[0]?.Id) {
        const payLoad: IUserAccountRequest = {
          username: payLoadCreation.username,
          deviceID: token + Math.random(),
          deviceIMEI: token,
          deviceName: deviceName,
          email: payLoadCreation.email,
          orgId: superAdminResponse[0]?.Id,
          phone: payLoadCreation.phone,
          countryCode: "+" + 91,
          publicKey,
          deviceOS: Platform.OS === "android" ? "android" : "ios",
        };
  
        dispatch(createAccount(payLoad)).then(() => {
          setLoginLoading(false);
        });
      } else {
        setLoginLoading(false);
        SnackBar({
          indicationMessage: "Registered Id is not generated ,please try again",
          doRetry: getSuperAdminApiCall(superAdminApi, {}, "GET"),
        });
      }
    }
   
  };
  if (keys && keys?.isGeneratedKeySuccess) {
    keys.isGeneratedKeySuccess = false;

    _registerAction(keys?.responseData?.result);
  }

  if (userDetails && userDetails?.isAccountCreatedSuccess) {
    setsuccessResponse(true);
    userDetails.isAccountCreatedSuccess = false;

    if (userDetails?.responseData) {
      setTimeout(() => {
        setsuccessResponse(false);
        props.navigation.navigate("BackupIdentity");
      }, 3000);
    }
  }
  if (userDetails && userDetails?.isAccountCreatedFailure) {
    userDetails.isAccountCreatedFailure = false;
    if (userDetails?.errorMesssage && isArray(userDetails?.errorMesssage)) {
      SnackBar({
        indicationMessage: userDetails?.errorMesssage[0],
      });
    } else {
      console.log("userDetails?.errorMesssage", userDetails?.errorMesssage);
    Alert.alert("Alert","User Already Exist,please upload another document")
    }
  }

  useEffect(()=>{
    console.log("RegisterType",type)
    console.log("RegisterType",fileUri?.imgres)
    console.log("RegisterType","praveen",fileUri?.uri)
    console.log("RegisterType","praveen",fileUri?.filename)

   // console.log("RegisterType",fileUri)
  },[])

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
    
        {fileUri?.type ==='application/pdf'?<View style={{flex:1,marginTop:70}}><PDFView
            fadeInDuration={100.0}
            style={{ flex: 1 }}
            resource={resources[resourceType]}
            resourceType={resourceType}
            onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
            onError={() => console.log("Cannot render PDF", error)}
          /></View>:<View style={{ flex: 0.8,alignSelf:'center'}}>
            <Image
          resizeMode={"contain"}
          style={{
            width: 330,
            height: "100%",
          }}
          source={{ uri: fileUri.uri }}
        ></Image></View>}
       
  

      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <Button
          onPress={goBack}
          style={{
            buttonContainer: {
              elevation: 5,
              width: 150,
              backgroundColor: "transparent",
            },
            text: {
              color: Screens.colors.primary,
            },
            iconStyle: {
              tintColor: Screens.pureWhite,
            },
          }}
          title={"retakes"}
        ></Button>
        <Button
          onPress={alertUploadDoc}
          style={{
            buttonContainer: {
              elevation: 5,
              width: 150,
            },
            text: {
              color: Screens.pureWhite,
            },
            iconStyle: {
              tintColor: Screens.pureWhite,
            },
          }}
          title={"uploads"}
        ></Button>
      </View>
      <Loader
            loadingText={
              isEarthId() ? "earthidgeneratesuccess" : "globalgeneratesuccess"
            }
            Status="status"
            isLoaderVisible={successResponse}
          ></Loader>
      <Spinner
              visible={loading || loginLoading ||superAdminLoading}
              textContent={"Loading..."}
              textStyle={styles.spinnerTextStyle}
            />
  
     
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.black,
  },
  spinnerTextStyle: {
    color: "#fff",
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

export default DocumentPreviewScreen;
