import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  AsyncStorage,
  Alert,
} from "react-native";
import Header from "../../../components/Header";
import { SCREENS } from "../../../constants/Labels";
import { Screens } from "../../../themes";
import Button from "../../../components/Button";
import { LocalImages } from "../../../constants/imageUrlConstants";
import GenericText from "../../../components/Text";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { ESecurityTypes } from "../../../typings/enums/Security";
import { SaveSecurityConfiguration } from "../../../redux/actions/LocalSavingActions";
import { SnackBar } from "../../../components/SnackBar";
import TouchID from "react-native-touch-id";

interface IHomeScreenProps {
  navigation?: any;
}

const Register = ({ navigation }: IHomeScreenProps) => {
  const dispatch = useAppDispatch();
  const securityReducer: any = useAppSelector((state) => state.security);
  const [data, setData] = useState();
  const [disableTouchId, setDisableTouchId] = useState(true);

  useEffect(() => {
    setMetrics();
  }, []);

  const setMetrics = async () => {
    await AsyncStorage.setItem("pageName", "Security");
  };
  const saveSelectionSecurities = (
    securityMode: any,
    enabled = false,
    re_Direct: string
  ) => {
    let payLoad = [];

    if (
      securityReducer &&
      securityReducer?.securityData &&
      securityReducer?.securityData?.length > 0
    ) {
      payLoad = securityReducer?.securityData;
    }
    if (
      (payLoad[0]?.types === ESecurityTypes.FACE ||
        payLoad[0]?.types === ESecurityTypes.FINGER) &&
      securityMode !== ESecurityTypes.PASSCORD &&
      payLoad[0]?.enabled
    ) {
      SnackBar({
        indicationMessage: "Please choose password security as mandotory",
      });
    } else {
      if (payLoad.length === 0) {
        payLoad.push({
          types: securityMode,
          enabled,
        });
      }

      dispatch(SaveSecurityConfiguration(payLoad));
      navigation.navigate(re_Direct);
    }
  };
  const getSelectedDState = (type: any) => {
    let selected = false;
    if (
      securityReducer &&
      securityReducer?.securityData &&
      securityReducer?.securityData?.length > 0
    ) {
      securityReducer?.securityData?.map((item) => {
        if (item.types === type && item.enabled === true) {
          selected = true;
          return;
        }
      });
    }
    return selected;
  };

  useEffect(() => {
    _isSupported();
  }, []);

  const showAlert = () => {
    SnackBar({
      indicationMessage: "FingerPrint not supported on this device !",
    });
  };

  const _isSupported = async () => {
    try {
      const data = await TouchID.isSupported();
      console.log("data", data);
      if (data === "FaceID") {
        setDisableTouchId(true);
      } else {
        setDisableTouchId(false);
      }
    } catch (e) {
      Alert.alert("TouchID is not supported!");
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <ScrollView contentContainerStyle={styles.sectionContainer}>
        <Header
          isBack
          letfIconPress={() => navigation.goBack()}
          isLogoAlone={true}
          headingText={"addsecurity"}
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
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: 30,
              }}
            >
              <Image
                resizeMode="contain"
                style={[styles.logoContainer]}
                source={LocalImages.securityImage}
              ></Image>
            </View>
            <GenericText
              style={[
                styles.categoryHeaderText,
                {
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: Screens.black,
                },
              ]}
            >
              {SCREENS.SECURITYSCREEN.instruction}
            </GenericText>
            <GenericText
              style={[
                styles.categoryHeaderText,
                {
                  fontSize: 13,
                  fontWeight: "500",
                  textAlign: "center",
                  color: Screens.grayShadeColor,
                },
              ]}
            >
              {SCREENS.SECURITYSCREEN.instructions}
            </GenericText>
            <Button
              selected={getSelectedDState(ESecurityTypes.FINGER)}
              disabled={getSelectedDState(ESecurityTypes.FINGER)}
              onPress={() => {
                disableTouchId
                  ? showAlert()
                  : saveSelectionSecurities(
                      ESecurityTypes.FINGER,
                      false,
                      "FingerPrintInstructionScreen"
                    );
              }}
              style={{
                buttonContainer: {
                  opacity: disableTouchId ? 0.5 : 1,
                  backgroundColor: getSelectedDState(ESecurityTypes.FINGER)
                    ? "#e6ffe6"
                    : "#fff",
                  elevation: 2,
                  borderColor: getSelectedDState(ESecurityTypes.FINGER)
                    ? "green"
                    : Screens.colors.primary,
                },
                iconStyle: {
                  tintColor: Screens.colors.primary,
                },
              }}
              leftIcon={LocalImages.touchidpic}
              title={"usetouchid"}
            ></Button>

            <View style={{ marginTop: -20 }}>
              <Button
                selected={getSelectedDState(ESecurityTypes.FACE)}
                disabled={getSelectedDState(ESecurityTypes.FACE)}
                onPress={() => {
                  saveSelectionSecurities(
                    ESecurityTypes.FACE,
                    false,
                    "RegisterFace"
                  );
                }}
                style={{
                  buttonContainer: {
                    backgroundColor: getSelectedDState(ESecurityTypes.FACE)
                      ? "#e6ffe6"
                      : "#fff",
                    elevation: 2,
                    borderColor: getSelectedDState(ESecurityTypes.FACE)
                      ? "green"
                      : Screens.colors.primary,
                  },
                  iconStyle: {
                    tintColor: Screens.colors.primary,
                  },
                }}
                leftIcon={LocalImages.faceidpic}
                title={"usefaceid"}
              ></Button>
            </View>
            <View style={{ marginTop: -20 }}>
              <Button
                selected={getSelectedDState(ESecurityTypes.PASSCORD)}
                disabled={getSelectedDState(ESecurityTypes.PASSCORD)}
                onPress={() => {
                  saveSelectionSecurities(
                    ESecurityTypes.PASSCORD,
                    false,
                    "SetPin"
                  );
                }}
                style={{
                  buttonContainer: {
                    elevation: 2,

                    borderColor: getSelectedDState(ESecurityTypes.PASSCORD)
                      ? "green"
                      : Screens.colors.primary,
                    backgroundColor: getSelectedDState(ESecurityTypes.PASSCORD)
                      ? "#e6ffe6"
                      : "#fff",
                  },
                  iconStyle: {
                    tintColor: Screens.colors.primary,
                  },
                }}
                leftIcon={LocalImages.passcordImage}
                title={"usepasscode"}
              ></Button>
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
  logoContainer: {
    width: 100,
    height: 100,
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
    marginTop: -160,
    marginHorizontal: 15,
    elevation: 5,
    borderRadius: 10,
    flex: 0.1,
    justifyContent: "space-between",
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
  cardContainer: {
    flex: 1,
    paddingVertical: 9,
    title: {
      color: Screens.grayShadeColor,
    },
  },
  textInputContainer: {
    borderRadius: 10,
    borderColor: Screens.colors.primary,
    borderWidth: 2,
    marginLeft: 10,
    marginTop: -2,
  },
});

export default Register;
