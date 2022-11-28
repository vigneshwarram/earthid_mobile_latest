import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  AsyncStorage,
} from "react-native";
import { Screens } from "../../themes/index";
import { values } from "lodash";
import { LocalImages } from "../../constants/imageUrlConstants";
import { ABOUT_ROUTES, SETTING_LIST } from "../../constants/Routes";
import { StackActions } from "@react-navigation/native";
import GenericText from "../../components/Text";
import { useAppDispatch } from "../../hooks/hooks";
import { FlushData } from "../../redux/actions/authenticationAction";
import BottomSheet from "../../components/Bottomsheet";
import { useSSR } from "react-i18next";
import il8n, { getUserLanguagePreference } from ".././../utils/i18n";
import { AppLanguage } from "../../typings/enums/AppLanguage";
import { LanguageContext } from "../../components/LanguageContext/LanguageContextProvider";
import Header from "../../components/Header";

const CustomDrawer = (props: any) => {
  const dispatch = useAppDispatch();
  const [languageVisible, setLanguageVisible] = useState(false);

  const _navigateAction = (item: any) => {
    if (item.CARD === "language") {
      setLanguageVisible(true);
    } else {
      props.navigation.navigate("UpdateAuthentication");
    }
  };
  const [langugeList, setLanguageList] = useState([
    { label: "English", value: AppLanguage.ENGLISH, selection: true },
    { label: "Spanish", value: AppLanguage.SPANISH, selection: false },
    { label: "Portuguese", value: AppLanguage.PORTUGUESE, selection: false },
  ]);

  useEffect(() => {
    getStoredLanguage();
  }, []);

  const getStoredLanguage = async () => {
    const getUserLanguagePreferences = await AsyncStorage.getItem(
      "setLanguage"
    );
    let langugeLists = [];

    if (getUserLanguagePreferences === AppLanguage.ENGLISH) {
      console.log("getUserLanguagePreferences=====>");
      langugeLists = langugeList.map((item, index) => {
        if (index === 0) {
          item.selection = true;
        } else {
          item.selection = false;
        }
        return item;
      });
    } else if (getUserLanguagePreferences === AppLanguage.PORTUGUESE) {
      langugeLists = langugeList.map((item, index) => {
        if (index === 2) {
          item.selection = true;
        } else {
          item.selection = false;
        }
        return item;
      });
    } else {
      langugeLists = langugeList.map((item, index) => {
        if (index === 1) {
          item.selection = true;
        } else {
          item.selection = false;
        }
        return item;
      });
    }

    setLanguageList([...langugeLists]);
  };

  const _renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => _navigateAction(item)}>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          margin: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={[styles.avatarContainer, { backgroundColor: item.COLOR }]}
          >
            <Image
              resizeMode="contain"
              style={styles.avatarImageContainer}
              source={item.URI}
            ></Image>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <GenericText
              style={[
                {
                  fontSize: 14,
                  marginHorizontal: 10,
                  color: Screens.black,
                  fontWeight: "500",
                },
              ]}
            >
              {item.TITLE}
            </GenericText>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            resizeMode="contain"
            style={styles.avatarImageContainer}
            source={item.RIGHT_ICON}
          ></Image>
        </View>
      </View>
    </TouchableOpacity>
  );

  const selectLanguage = (item: any) => {
    il8n.changeLanguage(item.value);
    const languageList = langugeList.map((itemData, inde) => {
      if (itemData.label === item.label) {
        itemData.selection = !itemData.selection;
      } else {
        itemData.selection = false;
      }
      return itemData;
    });
    setLanguageList(languageList);
    setLanguageVisible(false);
  };

  const _keyExtractor = ({ TITLE }: any) => TITLE.toString();
  return (
    <View style={styles.sectionContainer}>
        <Header
            isBack
            letfIconPress={() => props.navigation.goBack()}
            headingText= {"setting"}
            linearStyle={styles.linearStyle}
        ></Header>
     
      <FlatList<any>
        data={SETTING_LIST}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
      />
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
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.colors.background,
  },
  linearStyle: {
    height: 120,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
  },
  cardContainer: {
    flex: 1,
    margin: 10,
  },
  avatarImageContainer: {
    width: 20,
    height: 20,
    tintColor: "#000",
  },
  avatarContainer: {
    backgroundColor: "red",
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    height: 120,
    backgroundColor: "#8b88db",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  logoContainer: {
    width: 25,
    height: 25,
    tintColor: "#fff",
  },

  closeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomDrawer;
