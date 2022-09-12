import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Linking } from "react-native";
import Header from "../../../components/Header";
import { LocalImages } from "../../../constants/imageUrlConstants";
import { SCREENS } from "../../../constants/Labels";
import { Screens } from "../../../themes";
import Button from "../../../components/Button";
import Snackbar from "react-native-snackbar";
import { LanguageContext } from "../../../components/LanguageContext/LanguageContextProvider";
import { getUserLanguagePreference } from "../../../utils/i18n";
import GenericText from "../../../components/Text";

interface IHomeScreenProps {
  navigation?: any;
}

const landingPage = ({ navigation }: IHomeScreenProps) => {
  const navigateAction = async () => {
    navigation.navigate("RegisterScreen");
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

  useEffect(() => {
    initializeUserPreferences();
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <ScrollView contentContainerStyle={styles.sectionContainer}>
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
              onPress={() => navigation.navigate("uploadDocumentsScreen")}
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
              leftIcon={LocalImages.registerdocumentImage}
              title={"registermanually"}
            ></Button>
          </View>
          <View>
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
              {"alreadyhaveearthid"}
            </GenericText>
            <Button
              onPress={() => navigation.navigate("uploadDocumentsScreen")}
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
              leftIcon={LocalImages.qrcodeImage}
              title={SCREENS.LANDINGSCREEN.BUTTON_LABEL}
            ></Button>

            <View style={{ flexDirection: "column" }}>
              <GenericText
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
                {"continuetoagree"}
              </GenericText>

              <GenericText
                style={{ color: Screens.colors.primary, alignSelf: "center" }}
              >
                {"termpolicy"}
              </GenericText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexGrow: 1,
    backgroundColor: Screens.colors.background,
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
    marginHorizontal: 20,
    marginVertical: 10,

    color: Screens.headingtextColor,
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
    backgroundColor: Screens.pureWhite,
    padding: 10,
    marginTop: -100,
    marginHorizontal: 15,
    elevation: 5,
    borderRadius: 30,
    flex: 0.95,
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
