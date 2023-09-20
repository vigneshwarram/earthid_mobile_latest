import { values } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  AsyncStorage,
  TouchableOpacity,
  Alert,
  Platform,
  AppState,
  Text
} from "react-native";
import { EventRegister } from "react-native-event-listeners";
import RNFS from "react-native-fs";
import Avatar from "../../../components/Avatar";
import Card from "../../../components/Card";
import Header from "../../../components/Header";
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
import GenericText from "../../../components/Text";
import { Linking } from "react-native";
import { LocalImages } from "../../../constants/imageUrlConstants";
import { SCREENS } from "../../../constants/Labels";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  getHistory,
  saveDocuments,
} from "../../../redux/actions/authenticationAction";
import { savingProfilePictures } from "../../../redux/actions/LocalSavingActions";
import { Screens } from "../../../themes";
import { getColor } from "../../../utils/CommonFuntion";

import { dateTime } from "../../../utils/encryption";
import RNFetchBlob from "rn-fetch-blob";
import { IDocumentProps } from "../../uploadDocuments/VerifiDocumentScreen";
import NetInfo from '@react-native-community/netinfo';
import { createUserSignaturekey } from "../../../utils/createUserSignaturekey";
import { newssiApiKey } from "../../../utils/earthid_account";
import { createVerifiableCred } from "../../../utils/createVerifiableCred";
import Spinner from "react-native-loading-spinner-overlay/lib";


interface IHomeScreenProps {
  navigation?: any;
  route?: any;
}
type SharedItem = {
  mimeType: string;
  data: string;
  extraData: any;
};

const HomeScreen = ({ navigation, route }: IHomeScreenProps) => {
  const userDetails = useAppSelector((state) => state.account);
  const getHistoryReducer = useAppSelector((state) => state.getHistoryReducer);
  const profilePicture = useAppSelector((state) => state.savedPic);
  const securityReducer: any = useAppSelector((state) => state.security);
  const[createVerifyCondition,setcreateVerifyCondition]=useState(true)
  const[createVerifyCondition1,setcreateVerifyCondition1]=useState(true)
  const[signature,setSignature]=useState()
  const [loading, setLoading] = useState(false);
  const[createVerify,setCreateVerify]=useState({})
  const keys = useAppSelector((state) => state.user);
  const issurDid = keys?.responseData?.issuerDid
  const UserDid  = keys?.responseData?.newUserDid  
  const privateKey = keys?.responseData?.generateKeyPair?.privateKey 
  let url : any  = `https://ssi-test.myearth.id/api/user/sign?issuerDID=${issurDid}`
  let requesturl : any  = `https://ssi-test.myearth.id/api/issuer/verifiableCredential?isCryptograph=${false}&downloadCryptograph=${false}`    

  const disPatch = useAppDispatch();

  let flatListRef: any = useRef();

  console.log(signature,"sign");
  console.log(createVerify,"createVerify");
  console.log(UserDid,"UserDid");
  console.log(userDetails?.responseData?.publicKey,"publickey");
  
  //recent activity
  const documentsDetailsList = useAppSelector((state) => state.Documents);
  const recentData = documentsDetailsList?.responseData;
  const data = documentsDetailsList?.responseData;

  const [aState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        console.log('Next AppState is: ', nextAppState);
        if(nextAppState==='active'){
          ShareMenu.getInitialShare(handleShare);
        }
        setAppState(nextAppState);
      },
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);
  const [recentDataOfDocument, setrecentData] = useState([]);
  const dispatch = useAppDispatch();
  const _toggleDrawer = () => {
    navigation.openDrawer();
  };

  async function convertToBase64(path: string) {
    const result = await RNFS.readFile(path, "base64");
    return `data:image/png;base64,${result}`;
  }

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, []);



 

  const handleShare = useCallback(async (item: SharedItem | null) => {
  
    if (!item) {
      return;
    }
    if (Platform.OS === "android") {
      const { mimeType, data, extraData } = item;
      console.log("datamimeType", data);
      console.log("datamimeType", extraData);
      console.log("datamimeType", extraData);
      const imageName = data.split("/").pop() + ".jpg";
      console.log("imageName",imageName)

      const fileStat = await RNFS.stat(data);
      console.log("imageName",fileStat)
      const uriimage = fileStat.originalFilepath
      const uriimage1 :any = uriimage.split("/").pop()
      const uriimage2 = uriimage1.split(".")[0]
      console.log("imageName",uriimage2)



      if (
        mimeType === "image/*" ||
        mimeType === "image/jpeg" ||
        mimeType === "image/png"
      ) {
        const imagePath = data;
        const base64 = await convertToBase64(imagePath);
        const fileUri = {
          base64: base64,
          type: mimeType,
          uri: base64,
          flow: "deeplink",
          docName:uriimage2,
          file: {
            uri: base64,
          },
        };
        navigation.navigate("DocumentPreviewScreen", { fileUri: fileUri });
      } else {
        const imagePath = data;
        const base64 = await RNFS.readFile(imagePath, "base64");
        console.log("data====>", base64);
        const fileUri = {
          base64: base64,
          type: mimeType,
          uri: base64,
          flow: "deeplink",
          docName:uriimage2,
          file: {
            uri: base64,
          },
        };
        navigation.navigate("DocumentPreviewScreen", { fileUri: fileUri });
      }
    } else {
      const { mimeType, data, extraData } = item;
      console.log("datamimeType", extraData);
      console.log("extraData?.mimeType", extraData?.mimeType);


      const fileStat = await RNFS.stat(data);
      console.log("imageName",fileStat)
      const uriimage = fileStat.originalFilepath
      const uriimage1 :any = uriimage.split("/").pop()
      const uriimage2 = uriimage1.split(".")[0]
      console.log("imageName",uriimage2)


      if (
        extraData?.mimeType === "image/*" ||
        extraData?.mimeType === "image/jpeg" ||
        extraData?.mimeType === "image/png" ||
        extraData?.mimeType === "text/plain"
      ) {
        const imagePath = extraData?.data?.replaceAll("%20", " ");
        const base64 = await convertToBase64(imagePath);

        const fileUri = {
          base64: imagePath,
          type: extraData?.mimeType,
          uri: imagePath,
          flow: "deeplink",
          docName:uriimage2,
          imagePath: imagePath,
          file: {
            uri: base64,
          },
        };
        navigation.navigate("DocumentPreviewScreen", { fileUri: fileUri });
      } else {
        const imagePath = extraData?.data?.replaceAll("%20", " ");
        const base64 = await RNFS.readFile(imagePath, "base64");
        console.log("data====>", base64);
        const fileUri = {
          base64: base64,
          type: extraData?.mimeType,
          uri: base64,
          docName:uriimage2,
          flow: "deeplink",
          file: {
            uri: base64,
          },
        };
        navigation.navigate("DocumentPreviewScreen", { fileUri: fileUri });
      }
    }
  }, []);
  const uploadPdf = (base64: string) => {};
  const validateImages = (base64: string) => {
    // AddDocumehtfetch(CreateHistory, payLoad, "POST");
    setTimeout(() => {
      var date = dateTime();
      const filePath = RNFetchBlob.fs.dirs.DocumentDir + "/" + "Adhaar";
      var documentDetails: IDocumentProps = {
        id: `ID_VERIFICATION`,
        name: "Id",
        path: filePath,
        date: date?.date,
        time: date?.time,
        txId: "",
        docType: "jpg",
        docExt: ".jpg",
        processedDoc: "",
        base64: base64,
        categoryType: "insurance",
        vc: undefined,
        isVc: false,
        color: "rgba(191, 245, 206, 1)",
      };
     console.log('documentsDetailsList?.responseData',documentsDetailsList?.responseData)
      var DocumentList = documentsDetailsList?.responseData
        ? documentsDetailsList?.responseData
        : [];
      DocumentList.push(documentDetails);
      dispatch(saveDocuments(DocumentList));
      getHistoryReducer.isSuccess = false;
      setTimeout(() => {
       
      }, 2000);
    }, 200);
  };
  useEffect(() => {
    console.log('recentData====>',recentData)
    if (documentsDetailsList) {
      let recentDataFillerWithColor: any = recentData &&  recentData?.map(
        (item: any, index: any) => {
          let colors = item?.documentName;
          let iteName = colors?.trim()?.split("(")[0].trim();
          console.log("recentDataFillerWithColor====>", iteName);
          item.color = getColor(iteName);
          return item;
        }
      );
      if (recentDataFillerWithColor?.length > 0) {
        setrecentData(recentDataFillerWithColor);
      }else{
        setrecentData([]);
      }
    }
  }, [documentsDetailsList]);

  const categoryList = values(SCREENS.HOMESCREEN.categoryList).map(
    ({ TITLE: title, URI: uri, COLOR: color }: any) => ({
      title,
      uri,
      color,
    })
  );
  const documentList = values(SCREENS.HOMESCREEN.DocumentList).map(
    ({ TITLE: title, URI: uri, COLOR: color }: any) => ({
      title,
      uri,
      color,
    })
  );


  const isNetworkConnect=()=>{
  
    NetInfo.fetch().then((state) => {
      console.log("isconnect", state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          'Network not connected',
          'Please check your internet connection and try again.',
          [{ text: 'OK' }],
          { cancelable: false },
        );
      }
    });
  }
  
  
  useEffect(()=>{
    isNetworkConnect()
  },[])


  const _renderItem = ({ item }: any) => {
    return (
      <Avatar
        avatarClick={() =>
          navigation.navigate("Documents", { category: item.title })
        }
        isCategory={true}
        isUploaded={false}
        text={item.title}
        iconSource={item.uri}
        style={{
          container: [styles.avatarContainer, { backgroundColor: item.color }],
          imgContainer: styles.avatarImageContainer,
          text: styles.avatarTextContainer,
        }}
      />
    );
  };

  const _renderItemDocuments = ({ item }: any) => {
    return (
      <View style={styles.documentContainer}>
        <Card
          title={item.title}
          leftIconSrc={item.uri}
          style={styles.cardContainer}
        />
      </View>
    );
  };

  const _avatarClick = () => {
    navigation.navigate("ProfileScreen");
  };
  if (getHistoryReducer?.isSuccess) {
    getHistoryReducer.isSuccess = false;
  }
  useEffect(() => {
    const listener: any = EventRegister.addEventListener("OpenDrawer", () => {
      navigation.openDrawer();
      return;
    });
    return () => {
      EventRegister.removeEventListener(listener);
      listener;
    };
  });
  useEffect(() => {
    setMetrics();
  }, []);

  const setMetrics = async () => {
    await AsyncStorage.setItem("pageName", "Home");
  };
  // useEffect(() => {
  //   const PayLoad = {
  //     userId: userDetails?.responseData?.Id,
  //     publicKey: userDetails?.responseData?.publicKey,
  //   };
  //   dispatch(getHistory(PayLoad));
  //   setValueSecurity();
  //   console.log("items==>", userDetails);
  // }, []);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    const profilePic = await AsyncStorage.getItem("profilePic");
    disPatch(savingProfilePictures(profilePic));
  };
  function convertTimeToAmPmFormat(timeString: { split: (arg0: string) => [any, any]; }) {
    const [hours, minutes] = timeString.split(':');
    let formattedTime = '';
    
    // Convert the 24-hour format to 12-hour format
    let hoursIn12HourFormat = parseInt(hours, 10) % 12;
    if (hoursIn12HourFormat === 0) {
      hoursIn12HourFormat = 12; // Set 12 for 0 (midnight) in 12-hour format
    }
    
    // Determine AM or PM
    const amOrPm = parseInt(hours, 10) < 12 ? 'am' : 'pm';
  
    // Add leading zero for single-digit minutes
    const paddedMinutes = minutes.padStart(2, '0');
    
    // Construct the formatted time string
    formattedTime = `${hoursIn12HourFormat}:${paddedMinutes} ${amOrPm}`;
    
    return formattedTime;
  }
  const getTime =(item: { time: any; })=>{
    return convertTimeToAmPmFormat(item?.time)
  }
  const getData =(datas: any[])=>{
    let arrayData =  datas?.sort(compareTime)
    let data =  arrayData?.reverse()
    return data
  
  }
  function compareTime(a, b) {
    const timeA = new Date(`1970-01-01T${a.time}`);
    const timeB = new Date(`1970-01-01T${b.time}`);
    return timeA - timeB;
  }
  const getCategoryImages = (item: { categoryType: any; name: any }) => {
    const getItems = SCREENS.HOMESCREEN.categoryList.filter(
      (itemFiltered, index) => {
        return (
          itemFiltered.TITLE.toLowerCase() === item?.categoryType?.toLowerCase()
        );
      }
    );

    return getItems[0];
  };
  const getImagesColor = (item: any) => {
    let colors = item?.documentName;
    let iteName = colors?.trim()?.split("(")[0]?.trim();
    return getColor(iteName);
  };

  const _renderItemHistory = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ViewCredential", { documentDetails: item })
        }
      >
        {item?.documentName && item?.documentName !== undefined && (
          <Card
            leftAvatar={LocalImages.documentsImage}
            absoluteCircleInnerImage={LocalImages.upImage}
            // rightIconSrc={LocalImages.menuImage}
            title={item?.isVc ?item.name : item?.documentName?.split("(")[1]?.split(")")[0] == "undefined" ?item?.docName : item?.docName}
            subtitle={`      Uploaded  : ${item.date}`}
            timeTitle={getTime(item) }
            style={{
              ...styles.cardContainers,
              ...{
                avatarContainer: {
                  backgroundColor: item.color,
                  width: 60,
                  height: 60,
                  borderRadius: 20,
                  marginTop: 25,
                  marginLeft: 10,
                  marginRight: 5,
                },
                uploadImageStyle: {
                  backgroundColor: item?.color,
                  borderRadius: 25,
                  borderWidth: 3,
                  bordercolor: "#fff",
                  borderWidthRadius: 25,
                },
              },
              title: {
                fontSize: 18,
                marginTop: -10,
                fontWeight: "bold",
              },
              subtitle: {
                fontSize: 14,
                marginTop: 5,
              },
            }}
          />
        )}
      </TouchableOpacity>
    );


    // return (
    //   <TouchableOpacity
    //   style={{
    //     height:110,
    //     borderRadius:25,
    //     elevation:4,
    //     marginLeft:20,marginRight:20,
    //     marginTop:10,
    //     marginBottom:10,
    //     backgroundColor:'#fff',
    //     justifyContent:"center"
    //   }}
    //   >
    //     <View style={{flexDirection:'row'}}>
    //     <Image
    //       source={LocalImages.documentsImage}
    //       style={{alignSelf:"center",height:70,width:60,marginLeft:10}}
    //     />

    //   <View style={{alignSelf:"center"}}>
    //     <Text
    //     style={{
    //       color: Screens.black,
    //       fontSize: 16,
    //       fontWeight: "500",
    //       paddingVertical: 1.5,
    //       marginLeft:15
    //     }}
    //     >{item?.isVc ?item.name : item?.documentName?.split("(")[1]?.split(")")[0] == "undefined" ? item?.docName : item?.docName}</Text>

    //     <View style={{flexDirection:"row"}}>

    //     <Text style={{color:Screens.grayShadeColor,marginTop:7}}>{`    Uploaded :${item.date}`}</Text>
    //     <Text
    //     style={{marginLeft:10,color:Screens.grayShadeColor,marginTop:7}}
    //     >{
    //       item.isVc
    //       ? item.time.substring(0, item.time.length - 3).split(":")[0] >= 24 ?
    //       item.time.substring(0, item.time.length - 3)+" AM" :
    //       item.time.substring(0, item.time.length - 3).split(":")[0] >= 12 ?
    //       item.time.substring(0, item.time.length - 3)+" PM" :
    //       item.time.substring(0, item.time.length - 3)+" AM"
    //       : item.time.substring(0, item.time.length - 3).split(":")[0] >= 24 ?
    //          item.time.substring(0, item.time.length - 3)+" AM" :
    //          item.time.substring(0, item.time.length - 3).split(":")[0] >= 12 ?
    //          item.time.substring(0, item.time.length - 3)+" PM" :
    //          item.time.substring(0, item.time.length - 3)+" AM"
    //       }</Text>

    //       <Image
    //       source={item?.isVc ? LocalImages.vcImage : null}
    //       style={{height:25,width:40,resizeMode:'cover',alignSelf:"center"}}
    //       />
    //     </View>
    //   </View>
    //     </View>
    //   </TouchableOpacity>
    // );


  };



  const _renderItemnew = ({ item }: any) => {
    return (
      // <Card
      //   leftAvatar={LocalImages.documentsImage}
      //   absoluteCircleInnerImage={LocalImages.upImage}
      //   //  rightIconSrc={LocalImages.menuImage}
      //   title={item.name}
      //   subtitle={`      Uploaded  : ${item.date}`}
      //   style={{
      //     ...styles.cardContainer,
      //     ...{
      //       avatarContainer: {
      //         backgroundColor: "rgba(245, 188, 232, 1)",
      //         width: 62,
      //         height: 62,
      //         borderRadius: 20,
      //         marginTop: 25,
      //         marginLeft: 10,
      //         marginRight: 5,
      //       },
      //       uploadImageStyle: {
      //         backgroundColor: "rgba(245, 188, 232, 1)",
      //         borderRadius: 25,
      //         borderWidth: 3,
      //         bordercolor: "#fff",
      //         borderWidthRadius: 25,
      //       },
      //     },
      //     title: {
      //       fontSize: 18,
      //       marginTop: -10,
      //       fontWeight: "bold",
      //     },
      //     subtitle: {
      //       fontSize: 14,
      //       marginTop: 5,
      //     },
      //   }}
      // />
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() =>
          navigation.navigate("ViewCredential", { documentDetails: item })
        }
      >
        
        <View style={{ marginTop: -20}}>
          <Card
            titleIcon={item?.isVc ? LocalImages.vcImage : null}
            leftAvatar={LocalImages.documentsImage}
            absoluteCircleInnerImage={LocalImages.upImage}
            title={item?.isVc ?item.name : item?.documentName?.split("(")[1]?.split(")")[0] == "undefined" ? item?.docName : item?.docName}
            subtitle={`      Uploaded  : ${item.date}`}
            // timeTitle={
            //   item.isVc
            //   ? item.time.substring(0, item.time.length - 3).split(":")[0] >= 24 ?
            //   item.time.substring(0, item.time.length - 3)+" AM" :
            //   item.time.substring(0, item.time.length - 3).split(":")[0] >= 12 ?
            //   item.time.substring(0, item.time.length - 3)+" PM" :
            //   item.time.substring(0, item.time.length - 3)+" AM"
            //   : item.time.substring(0, item.time.length - 3).split(":")[0] >= 24 ?
            //      item.time.substring(0, item.time.length - 3)+" AM" :
            //      item.time.substring(0, item.time.length - 3).split(":")[0] >= 12 ?
            //      item.time.substring(0, item.time.length - 3)+" PM" :
            //      item.time.substring(0, item.time.length - 3)+" AM"
            // }

            timeTitle={getTime(item)}

            style={{
              ...styles.cardContainernew,
              ...{
                avatarContainer: {
                  backgroundColor:item?.isVc?'#D7EFFB': getImagesColor(item),
                  width: 60,
                  height: 60,
                  borderRadius: 20,
                  marginTop: 25,
                  marginLeft: 10,
                  marginRight: 5,
                },
                uploadImageStyle: {
                  backgroundColor:item?.isVc?'#D7EFFB': getImagesColor(item),
                  borderRadius: 25,
                  borderWidth: 3,
                  bordercolor: "#fff",
                  borderWidthRadius: 25,
                },
              },
              title: {
                fontSize: 18,
                marginTop: -10,
                fontWeight: "bold",
              },
              subtitle: {
                fontSize: 14,
                marginTop: 5,
              },
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.sectionContainer}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 200,
          backgroundColor: "#fff",
        }}
      >
        <View>
          <Header
            picUri={profilePicture?.profileData}
            subCatSideArrowVisible
            leftIconSource={LocalImages.logoImage}
            // rewardPoints={"50"}
            // rightIconSource={LocalImages.giftBoxImage}
            isAvatar
            avatarClick={_avatarClick}
            onpress={() => {
              _toggleDrawer();
            }}
            linearStyle={styles.linearStyle}
          ></Header>
          <View style={styles.flatPanel}>
            <View style={styles.alignCenter}>
              <GenericText style={[styles.label, { fontSize: 12 }]}>
                {SCREENS.HOMESCREEN.appName}
              </GenericText>
              <GenericText style={[styles.label, { fontSize: 16 }]}>
                {userDetails?.responseData?.earthId}
              </GenericText>
            </View>
            {/* <CircularProgress
              value={60}
              radius={30}
              activeStrokeWidth={5}
              activeStrokeColor={Screens.colors.primary}
            /> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <GenericText
                style={[styles.categoryHeaderText, { fontSize: 13 }]}
              >
                {SCREENS.HOMESCREENTITLES.CATEGORIES}
              </GenericText>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  alignSelf: "center",
                  marginRight: 40,
                }}
                onPress={() => flatListRef.scrollToIndex({ index: 0 })}
              >
                <Image
                  source={LocalImages.backicon}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: "gray",
                    alignSelf: "center",
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  alignSelf: "center",
                }}
                onPress={() => flatListRef.scrollToEnd()}
              >
                <Image
                  source={LocalImages.nexticon}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: "gray",
                    alignSelf: "center",
                    marginRight: 50,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.flatPanel, { height: 130, marginTop: -10 }]}>
            <FlatList<any>
              horizontal
              ref={(ref) => {
                flatListRef = ref;
              }}
              showsHorizontalScrollIndicator={false}
              data={categoryList}
              renderItem={_renderItem}
            />
          </View>
          <GenericText style={[styles.categoryHeaderText, { fontSize: 13 }]}>
            {SCREENS.HOMESCREEN.documentLabel}
          </GenericText>
          {/* <FlatList<any>
            showsHorizontalScrollIndicator={false}
            // data={
            //   getHistoryReducer && getHistoryReducer?.responseData
            //     ? getHistoryReducer.responseData
            //     : []
            // }
            data={getData(recentData)}
            
            renderItem={_renderItemHistory}
          /> */}



                  <FlatList<any>
                    showsHorizontalScrollIndicator={false}
                    // data={
                    //   getHistoryReducer && getHistoryReducer?.responseData
                    //     ? getHistoryReducer.responseData
                    //     : []
                    // }
                    data={data}
                    extraData={data}
                    renderItem={_renderItemnew}
                    keyExtractor={(item) => item.id}
                  />




          {/* <AnimatedLoader
            isLoaderVisible={getHistoryReducer?.isLoading}
            loadingText="loading"
          /> */}
          {recentDataOfDocument && recentDataOfDocument?.length === 0 && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                resizeMode="contain"
                style={[styles.logoContainer]}
                source={LocalImages.recent}
              ></Image>
            </View>
          )}
        </View>

        <Spinner
              visible={loading}
              textContent={"Loading..."}
              textStyle={styles.spinnerTextStyle}
            />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.colors.background,
  },
  spinnerTextStyle: {
    color: "#fff",
  },
  cardContainernew: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: Screens.pureWhite,
    title: {
      color: Screens.black,
    },
    textContainer: {
      justifyContent: "center",
      alignItems: "center",
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
  },
  linearStyle: {
    height: 330,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: "#000",
  },
  logoContainer: {
    width: 200,
    height: 150,
    resizeMode: "contain",
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: "#000",
  },
  alignCenter: { justifyContent: "center", alignItems: "center" },
  label: {
    fontWeight: "bold",
    color: Screens.black,
  },
  categoryHeaderText: {
    marginHorizontal: 30,
    marginVertical: 20,
    color: Screens.headingtextColor,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginHorizontal: 8,
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
  documentContainer: {
    borderColor: Screens.colors.primary,
    borderWidth: 0.5,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 20,
  },
  cardContainers: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: Screens.pureWhite,
    title: {
      color: Screens.black,
    },
    textContainer: {
      justifyContent: "center",
      alignItems: "center",
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
  },
});

export default HomeScreen;
