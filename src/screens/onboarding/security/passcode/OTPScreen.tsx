import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import Header from "../../../../components/Header";
import { SCREENS } from "../../../../constants/Labels";
import { Screens } from "../../../../themes";
import Button from "../../../../components/Button";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { LocalImages } from "../../../../constants/imageUrlConstants";
import { useFetch } from "../../../../hooks/use-fetch";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { api, MD5 } from "../../../../utils/earthid_account";
import AnimatedLoader from "../../../../components/Loader/AnimatedLoader";
import SuccessPopUp from "../../../../components/Loader";
import {
  approveOTP,
  byPassUserDetailsRedux,
  contractCall,
} from "../../../../redux/actions/authenticationAction";

interface IHomeScreenProps {
  navigation?: any;
  route?: any;
}

const Register = ({ navigation, route }: IHomeScreenProps) => {
  const _navigateAction = () => {
    navigation.navigate("ConfirmPincode");
  };
  const dispatch = useAppDispatch();
  const contractDetails = useAppSelector((state) => state.contract);
  const accountDetails = useAppSelector((state) => state.account);
  const getGeneratedKeys = useAppSelector((state) => state.user);
  const ApproveOtpResponse = useAppSelector((state) => state.ApproveOtp);
  console.log("contractDetails", contractDetails);
  const { type } = route.params;
  const { loading, data, error, fetch } = useFetch();
  const [code, setCode] = useState();
  const onPinCodeChange = (code: any) => {
    setCode(code);
  };
  const sendOtp = () => {
    var postData = {
      type: type,
      value: contractDetails?.responseData?.email,
      earthId: contractDetails?.responseData?.earthId,
      publicKey: getGeneratedKeys?.responseData?.publicKey,
      testnet: true,
    };
    fetch(api, postData, "POST");
  };

  useEffect(() => {
    if (!data) {
      console.log("data", data);
      sendOtp();
    }
  }, [data]);

  useEffect(() => {
    if (ApproveOtpResponse?.responseData) {
      let isEmailApproved = ApproveOtpResponse.responseData[1];
      let overallResponseData = {
        ...contractDetails.responseData,
        ...{ emailApproved: isEmailApproved },
      };

      dispatch(byPassUserDetailsRedux(overallResponseData)).then(() => {
        navigation.navigate("ProfileScreen");
      });
    }
  }, [ApproveOtpResponse]);

  const approveOtp = () => {
    let encryptedOTP = MD5(getGeneratedKeys?.responseData?.publicKey + code);
    const request = {
      functionName: "approveOTP",
      functionParams: [
        contractDetails?.responseData?.earthId,
        type === "mobile" ? "1" : "2",
        encryptedOTP.toString(),
      ],
      isViewOnly: false,
      accountId: accountDetails?.responseData.toString().split(".")[2],
      privateKey: getGeneratedKeys?.responseData.privateKey,
      publicKey: getGeneratedKeys?.responseData.publicKey,
    };
    dispatch(approveOTP(request));
  };
  return (
    <View style={styles.sectionContainer}>
      <ScrollView contentContainerStyle={styles.sectionContainer}>
        <Header
          isLogoAlone={true}
          headingText={"Set Passcord"}
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

            <Text
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
              {SCREENS.SECURITYSCREEN.passcordInstruction}
            </Text>
            <Text
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
              {SCREENS.SECURITYSCREEN.passcordInstructions}
            </Text>
          </View>
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
            title={"SUBMIT"}
          ></Button>
          <AnimatedLoader
            isLoaderVisible={loading || ApproveOtpResponse.isLoading}
            loadingText="Loading..."
          />
          <SuccessPopUp
            isLoaderVisible={ApproveOtpResponse?.responseData ? true : false}
            loadingText={"Email verification succeeded"}
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
