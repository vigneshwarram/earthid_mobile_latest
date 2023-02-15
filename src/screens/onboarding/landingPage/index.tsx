import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import Header from "../../../components/Header";
import { LocalImages } from "../../../constants/imageUrlConstants";
import { SCREENS } from "../../../constants/Labels";
import { Screens } from "../../../themes";
import Button from "../../../components/Button";

import { LanguageContext } from "../../../components/LanguageContext/LanguageContextProvider";
import il8n, { getUserLanguagePreference } from "../.././../utils/i18n";
import GenericText from "../../../components/Text";
import BottomSheet from "../../../components/Bottomsheet";
import { AppLanguage } from "../../../typings/enums/AppLanguage";
import { useTranslation } from "react-i18next";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import { isEarthId } from "../../../utils/PlatFormUtils";
interface IHomeScreenProps {
  navigation?: any;
}

const landingPage = ({ navigation }: IHomeScreenProps) => {
  const { t } = useTranslation();
  const navigateAction = async () => {
    navigation.navigate("RegisterScreen");
  };
  const [languageVisible, setLanguageVisible] = useState(false);
  const [selectedLanguage, setselectedLanguage] = useState(AppLanguage.ENGLISH);
  const [loading, setLoading] = useState(true);
  const [langugeList, setLanguageList] = useState([
    { label: "English", value: AppLanguage.ENGLISH, selection: true },
    { label: "Spanish", value: AppLanguage.SPANISH, selection: false },
    { label: "Portuguese", value: AppLanguage.PORTUGUESE, selection: false },
  ]);
  useEffect(() => {
    setTimeout(() => {
      setLanguageVisible(true);
    }, 500);
  }, []);

  useEffect(() => {
    navigationCheck();
  }, []);

  const navigationCheck = async () => {
    const pageName = await AsyncStorage.getItem("pageName");
    if (pageName) {
      if (pageName === "Security") {
        navigation.navigate("Security");
      } else if (pageName === "BackupIdentity") {
        navigation.navigate("BackupIdentity");
      }
    }
    setLoading(false);
  };

  const initializeUserPreferences = async () => {
    const { languageCode, changeLanguagePreference } =
      useContext(LanguageContext);
    const storedUserLanguagePref = await getUserLanguagePreference();
    console.log("storedUserLanguagePref", storedUserLanguagePref);

    if (languageCode !== storedUserLanguagePref) {
      changeLanguagePreference(storedUserLanguagePref, "SplashScreen");
    }
  };

  const selectLanguage = async (item: any) => {
    il8n.changeLanguage(item.value);
    await AsyncStorage.setItem("setLanguage", item.value);
    const languageList = langugeList.map((itemData, inde) => {
      if (itemData.label === item.label) {
        itemData.selection = !itemData.selection;
        setselectedLanguage(item.value);
      } else {
        itemData.selection = false;
      }
      return itemData;
    });
    setLanguageList(languageList);
    setLanguageVisible(false);
  };

  useEffect(() => {
    
    initializeUserPreferences();
  }, []);

  const openFilePicker = async () => {
    try {
      const resp: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        readContent: true,
      });

      let fileUri = resp[0].uri;
      RNFS.readFile(fileUri, "base64").then((res) => {
        console.log("res", resp);
        navigation.navigate("UploadDocumentPreviewScreen", {
          fileUri: {
            uri: `data:image/png;base64,${res}`,
            base64: res,
            file: resp[0],
            type: "qrRreader",
          },
        });
      });
    } catch (err) {}
  };

  const _handleBarCodeRead = (barCodeData: any) => {
    console.log("barcodedata", barCodeData);
  };

  return (
    <View style={styles.sectionContainer}>
      <ScrollView contentContainerStyle={styles.sectionContainer}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <Header
            isLogoAlone={true}
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
              <GenericText
                style={[
                  styles.categoryHeaderText,
                  {
                    fontSize: 18,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: Screens.black,
                  },
                ]}
              >
                {SCREENS.LANDINGSCREEN.setUpId}
              </GenericText>
              <GenericText
                style={[
                  styles.categoryHeaderText,
                  {
                    fontSize: 15,
                    fontWeight: "500",
                    textAlign: "center",
                    color: Screens.grayShadeColor,
                  },
                ]}
              >
                {SCREENS.LANDINGSCREEN.instruction}
              </GenericText>
              <Button
                onPress={() => navigation.navigate("UploadDocument",{type :{data:"reg"}})}
                style={{
                  buttonContainer: {
                    backgroundColor: Screens.pureWhite,
                    elevation: 5,
                  },
                  iconStyle: {
                    tintColor: Screens.colors.primary,
                  },
                }}
                leftIcon={LocalImages.registerdocumentImage}
                title={"registerwithdoc"}
              ></Button>
              <View style={{ marginTop: -20 }}>
                <Button
                  onPress={navigateAction}
                  style={{
                    buttonContainer: {
                      backgroundColor: Screens.pureWhite,
                      elevation: 5,
                    },
                    iconStyle: {
                      tintColor: Screens.colors.primary,
                    },
                  }}
                  leftIcon={LocalImages.manualIcon}
                  title={"registermanually"}
                ></Button>
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <GenericText
                style={[
                  styles.categoryHeaderText,
                  {
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                    color: Screens.black,
                  },
                ]}
              >
                {isEarthId() ? "alreadyhaveearthid" : "alreadyhaveglobalid"}
              </GenericText>
              <Button
                onPress={() => navigation.navigate("UploadQr")}
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
                leftIcon={LocalImages.uploadqrimage}
                title={SCREENS.LANDINGSCREEN.BUTTON_LABEL}
              ></Button>

              <View style={{ paddingHorizontal: 15 }}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.categoryHeaderText,
                    {
                      fontSize: 13,
                      fontWeight: "500",
                      textAlign: "center",
                      color: Screens.black,
                    },
                  ]}
                >
                  {t("continuetoagrees")}

                  <Text
                    allowFontScaling={false}
                    style={{ color: Screens.colors.primary, fontSize: 13 }}
                    onPress={() =>
                      Linking.openURL("https://globalidiq.com/terms-of-use-3/")
                    }
                  >
                    {" "}
                    {t("termpolicy")}
                  </Text>
                </Text>
              </View>
            </View>
            <BottomSheet
              onClose={() => setLanguageVisible(false)}
              height={300}
              isVisible={languageVisible}
            >
              <View
                style={{
                  height: 280,
                  width: "100%",
                  paddingHorizontal: 10,
                }}
              >
                <GenericText
                  style={[
                    {
                      fontSize: 18,
                      marginHorizontal: 20,
                      marginVertical: 25,
                      color: Screens.black,
                      fontWeight: "500",
                    },
                  ]}
                >
                  {"selectLanguages"}
                </GenericText>
                {langugeList.map((item, index) => (
                  <TouchableOpacity onPress={() => selectLanguage(item)}>
                    <View
                      style={{
                        marginVertical: 7,
                        backgroundColor: item.selection ? "#e6ffe6" : "#fff",
                        padding: 10,
                        borderRadius: 8,
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <GenericText
                        style={[
                          {
                            fontSize: 18,
                            marginHorizontal: 20,
                            color: Screens.black,
                            fontWeight: "500",
                          },
                        ]}
                      >
                        {item?.label}
                      </GenericText>
                      <Image
                        resizeMode="contain"
                        style={[
                          styles.avatarImageContainer,
                          { tintColor: item.selection ? "green" : "#fff" },
                        ]}
                        source={LocalImages.successTikImage}
                      ></Image>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </BottomSheet>
          </View>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => setLanguageVisible(true)}
          >
            <View
              style={{
                width: 120,
                height: 40,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 15,
                borderRadius: 20,
                backgroundColor: Screens.colors.primary,
                flexDirection: "row",
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                  tintColor: "#fff",
                }}
                source={LocalImages.translateImage}
              ></Image>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <GenericText
                  style={[
                    styles.categoryHeaderText,
                    {
                      fontSize: 12,
                      fontWeight: "bold",
                      textAlign: "center",
                      color: Screens.pureWhite,
                      marginHorizontal: 5,
                    },
                  ]}
                >
                  {selectedLanguage}
                </GenericText>
              </View>
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                  tintColor: "#fff",
                }}
                source={LocalImages.down}
              ></Image>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator color={Screens.colors.primary} size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexGrow: 1,
    backgroundColor: Screens.colors.background,
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
    // marginHorizontal: 20,
    // marginVertical: 10,

    color: Screens.headingtextColor,
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
    marginTop: -120,
    backgroundColor: Screens.pureWhite,
    padding: 10,
    marginHorizontal: 15,
    paddingVertical: 30,
    elevation: 5,
    borderRadius: 30,

    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
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

  textInputContainer: {
    borderRadius: 10,
    borderColor: Screens.colors.primary,
    borderWidth: 2,
    marginLeft: 10,
    marginTop: -2,
  },
});

export default landingPage;
