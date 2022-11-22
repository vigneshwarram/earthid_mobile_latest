import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image,TouchableOpacity,Alert } from "react-native";
import Header from "../../../../components/Header";
import { SCREENS } from "../../../../constants/Labels";
import { Screens } from "../../../../themes";
import Button from "../../../../components/Button";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { LocalImages } from "../../../../constants/imageUrlConstants";
import { useFetch } from "../../../../hooks/use-fetch";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { alertBox, api, phoneOtp } from "../../../../utils/earthid_account";
import AnimatedLoader from "../../../../components/Loader/AnimatedLoader";
import SuccessPopUp from "../../../../components/Loader";
import {
  approveOTP,
  byPassUserDetailsRedux,
} from "../../../../redux/actions/authenticationAction";
import { is } from "immer/dist/internal";
import GenericText from "../../../../components/Text";

interface IHomeScreenProps {
  navigation?: any;
  route?: any;
}

const Register = ({ navigation, route }: IHomeScreenProps) => {
  const _navigateAction = () => {
    navigation.navigate("ConfirmPincode");
  };
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.account);

  const ApproveOtpResponse = useAppSelector((state) => state.ApproveOtp);

  const { type } = route.params;
  const {
    loading: sendEmailLoading,
    data: emailResponse,
    error: isEmailError,
    fetch: sendEmailOtp,
  } = useFetch();

  const {
    loading: sendPhoneLoading,
    data: phoneResponse,
    error: sendPhoneError,
    fetch: sendPhoneOtpAPI,
  } = useFetch();
  const [code, setCode] = useState();
  const onPinCodeChange = (code: any) => {
    var format = code.replace(/[^0-9]/g, "");
    setCode(format);
  };
  const sendOtp = () => {
    var postData = {
      email: userDetails?.responseData?.email,
      earthId: userDetails?.responseData?.earthId,
      publicKey: userDetails?.responseData?.publicKey,
    };
    sendEmailOtp(api, postData, "POST");
  };

  const sendPhoneOtp = () => {
    var postPhoneData = {
      phone: userDetails?.responseData?.phone,
      earthId: userDetails?.responseData?.earthId,
      publicKey: userDetails?.responseData?.publicKey,
      countryCode: `${userDetails?.responseData?.countryCode}`,
    };
    sendPhoneOtpAPI(phoneOtp, postPhoneData, "POST");
  };

  useEffect(() => {
    console.log("data", emailResponse);
    if (!emailResponse?.success) {
      if (type == "email") {
        sendOtp();
      }
    }
  }, [emailResponse]);

  useEffect(() => {
    console.log("data", phoneResponse);
    if (!phoneResponse?.success) {
      if (type !== "email") {
        sendPhoneOtp();
      }
    }
  }, [phoneResponse]);

  console.log("ApproveOtpResponse", ApproveOtpResponse);
  if (ApproveOtpResponse?.isApproveOtpSuccess) {
    ApproveOtpResponse.isApproveOtpSuccess = false;

    let overallResponseData;
    if (type === "phone") {
      overallResponseData = {
        ...userDetails.responseData,
        ...{ mobileApproved: true },
      };
    } else {
      overallResponseData = {
        ...userDetails.responseData,
        ...{ emailApproved: true },
      };
    }

    dispatch(byPassUserDetailsRedux(overallResponseData)).then(() => {
      navigation.navigate("ProfileScreen");
    });
  }

  const approveOtp = () => {
    const request = {
      otp: code,
      earthId: userDetails?.responseData?.earthId,
      publicKey: userDetails?.responseData?.publicKey,
    };

    dispatch(approveOTP(request, type));
  };

  return (
    <View style={styles.sectionContainer}>
      <ScrollView contentContainerStyle={styles.sectionContainer}>
        <Header
          letfIconPress={() => navigation.goBack()}
          isBack={true}
          headingText={type == "phone" ? "entermobotp" : "enteremailotp"}
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
                source={LocalImages.passcordImage}
              ></Image>
            </View>

            <GenericText
              style={[
                styles.categoryHeaderText,
                {
                  fontSize: 14,
                  fontWeight: "500",
                  textAlign: "center",
                  color: Screens.grayShadeColor,
                },
              ]}
            >
              {"plsenterotp"}
            </GenericText>
          </View>
          <View style={{ alignSelf: "center" }}>
            <SmoothPinCodeInput
              cellStyle={{
                borderWidth: 0.5,
                borderColor: Screens.grayShadeColor,
                borderRadius: 5,
              }}
              cellStyleFocused={{
                borderColor: Screens.colors.primary,
                borderWidth: 2,
              }}
              password
              cellSize={50}
              codeLength={6}
              value={code}
              onTextChange={onPinCodeChange}
            />
              <TouchableOpacity onPress={() => sendPhoneOtp()}>
          <GenericText
            style={[
              {
                fontSize: 13,
                color: "#293FEE",
                fontWeight: "500",
                alignSelf: "flex-end",
                marginTop: 8,
                textDecorationLine: "underline",
              },
            ]}
          >
            {"resendcode"}
          </GenericText>
        </TouchableOpacity>
          </View>
          <Button
            onPress={approveOtp}
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
            title={"submt"}
          ></Button>
          <AnimatedLoader
            isLoaderVisible={ApproveOtpResponse.isApproveLoading}
            loadingText="Loading..."
          />
          <SuccessPopUp
            isLoaderVisible={
              ApproveOtpResponse?.responseData &&
              ApproveOtpResponse.isApproveOtpSuccess
                ? true
                : false
            }
            loadingText={
              type === "phone"
                ? "Mobile number verification successful"
                : "Email verification successful"
            }
          />
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
