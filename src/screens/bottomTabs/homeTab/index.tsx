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
  const disPatch = useAppDispatch();

  let flatListRef: any = useRef();

  //recent activity
  let documentsDetailsList = useAppSelector((state) => state.Documents);
  let recentData = documentsDetailsList?.responseData;

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

      var DocumentList = documentsDetailsList?.responseData
        ? documentsDetailsList?.responseData
        : [];
      DocumentList.push(documentDetails);
      dispatch(saveDocuments(DocumentList));
      getHistoryReducer.isSuccess = false;
      setTimeout(() => {
        navigation.navigate("Documents");
      }, 2000);
    }, 200);
  };
  useEffect(() => {
    if (documentsDetailsList) {
      let recentDataFillerWithColor: any = recentData?.map(
        (item: any, index: any) => {
          let colors = item?.name;
          let iteName = colors?.trim()?.split("(")[0].trim();
          console.log("recentDataFillerWithColor====>", iteName);
          item.color = getColor(iteName);
          return item;
        }
      );
      if (recentDataFillerWithColor?.length > 0) {
        setrecentData(recentDataFillerWithColor);
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

  const _renderItemHistory = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ViewCredential", { documentDetails: item })
        }
      >
        {item?.name && item?.name !== undefined && (
          <Card
            leftAvatar={LocalImages.documentsImage}
            absoluteCircleInnerImage={LocalImages.upImage}
            // rightIconSrc={LocalImages.menuImage}
            title={item?.name}
            subtitle={`      Uploaded  : ${item.date}`}
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
          <FlatList<any>
            showsHorizontalScrollIndicator={false}
            // data={
            //   getHistoryReducer && getHistoryReducer?.responseData
            //     ? getHistoryReducer.responseData
            //     : []
            // }
            data={recentDataOfDocument}
            inverted
            renderItem={_renderItemHistory}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.colors.background,
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
