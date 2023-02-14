import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Platform, Alert } from "react-native";

import Button from "../../components/Button";
import SuccessPopUp from "../../components/Loader";
import AnimatedLoader from "../../components/Loader/AnimatedLoader";
import { LocalImages } from "../../constants/imageUrlConstants";
import { useFetch } from "../../hooks/use-fetch";
import { Screens } from "../../themes/index";
import { BASE_URL, uploadDocument, uploadRegisterDocument } from "../../utils/earthid_account";
import { useAppSelector } from "../../hooks/hooks";
import PDFView from "react-native-view-pdf";

const DocumentPreviewScreen = (props: any) => {
  const { fileUri } = props.route.params;
  const { type } = props.route.params;
  const userDetails = useAppSelector((state) => state.account);
  const { loading, data, error, fetch: uploadRegDoc } = useFetch();
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

      let data={
        image: fileUri?.uri
      }
      try{
        var response = uploadRegDoc(uploadRegisterDocument,data.image,"FORM-DATA")
        console.log("DocumentDetails:::::",response)
       // props.navigation.navigate("DrawerNavigator", { response });
      }catch(e){
        console.log("DocumentError:::::",e)
        console.log("DocumentError:::::","ERROR")
      }
     
    }
  }


  useEffect(()=>{
    console.log("RegisterType",type)
    console.log("RegisterType","praveen",fileUri?.base64)
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

export default DocumentPreviewScreen;
