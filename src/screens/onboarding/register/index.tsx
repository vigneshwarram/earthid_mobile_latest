import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Header from "../../../components/Header";
import { LocalImages } from "../../../constants/imageUrlConstants";
import { SCREENS } from "../../../constants/Labels";
import { Screens } from "../../../themes";
import Button from "../../../components/Button";
import Info from "../../../components/Info";
import TextInput from "../../../components/TextInput";
import PhoneInput from "react-native-phone-number-input";
import useFormInput from "../../../hooks/use-text-input";
import { nameValidator } from "../../../utils/inputValidations";
import Loader from "../../../components/Loader";
import {
  GeneratedKeysAction,
  createAccount,
} from "../../../redux/actions/authenticationAction";
import { ICreateAccount } from "../../../typings/AccountCreation/ICreateAccount";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { IContractRequest } from "../../../typings/AccountCreation/IContractRequest";

const Register = () => {
  const phoneInput: any = useRef();
  const dispatch = useAppDispatch();
  const [mobileNumber, setmobileNumber] = useState();
  const getGeneratedKeys = useAppSelector((state) => state.user);
  const accountDetails = useAppSelector((state) => state.account);
  const [isLoading, setIsLoading] = useState(false);
  const {
    value: fullName,
    isFocused: fullNameFocus,
    validationResult: {
      hasError: isfullNameError,
      errorMessage: isfullNameErrorMessage,
    },
    valueChangeHandler: fullNameChangeHandler,
    inputFocusHandler: fullNameFocusHandlur,
    inputBlurHandler: fullNameBlurHandler,
  } = useFormInput("", true, nameValidator);
  const {
    value: lastName,
    isFocused: lastNameFocus,
    validationResult: {
      hasError: isLastNameError,
      errorMessage: isLastNameErrorMessahe,
    },
    valueChangeHandler: lastNameChangeHandler,
    inputFocusHandler: lastNameFocusHandlur,
    inputBlurHandler: lastNameBlurHandler,
  } = useFormInput("", true, nameValidator);

  const {
    value: dateOfBirth,
    isFocused: dateOfBirthFocus,
    validationResult: {
      hasError: dateOfBirthError,
      errorMessage: dateOfBirthErrorMessage,
    },
    valueChangeHandler: dateOfBirthChangeHandler,
    inputFocusHandler: dateOfBirthocusHandlur,
    inputBlurHandler: dateOfBirthlurHandler,
  } = useFormInput("", true, nameValidator);

  const _navigateAction = () => {
    if (!getGeneratedKeys.responseData) {
      dispatch(GeneratedKeysAction());
    }
  };

  useEffect(() => {
    console.log("accountDetails", accountDetails);
    if (!accountDetails.responseData && getGeneratedKeys.responseData) {
      // const { publicKey } = getGeneratedKeys.responseData.result;
      let payLoad: ICreateAccount = {
        publicKeyHex: "publicKey",
        versionName: "2.0",
        deviceId: "",
        encryptedEmail: "",
        accountStatus: "",
        testnet: false,
      };

      dispatch(createAccount(payLoad));
    }
  }, [getGeneratedKeys]);

  useEffect(() => {
    // console.log("getGeneratedKeys", JSON.stringify(getGeneratedKeys));
    // console.log("accountDetails", JSON.stringify(accountDetails));
    if (accountDetails.result) {
      let payLoad: IContractRequest = {
        accountId: "",
        privateKey: "",
        publicKey: "",
        functionName: "",
        functionParams: [],
        isViewOnly: false,
      };
    }
  }, [accountDetails]);

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
            <Text
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
            </Text>
            <Info
              title={"Full Name"}
              style={{
                title: styles.title,
                subtitle: styles.subtitle,
                container: styles.textContainer,
              }}
            />
            <TextInput
              style={{
                container: styles.textInputContainer,
              }}
              isError={isfullNameError}
              errorText={isfullNameErrorMessage}
              onFocus={fullNameFocusHandlur}
              onBlur={fullNameBlurHandler}
              maxLength={60}
              isFocused={fullNameFocus}
              value={fullName}
              onChangeText={fullNameChangeHandler}
            />
            <Info
              title={"Last Name"}
              style={{
                title: styles.title,
                subtitle: styles.subtitle,
                container: styles.textContainer,
              }}
            />
            <TextInput
              style={{
                container: styles.textInputContainer,
              }}
              isError={isLastNameError}
              errorText={isLastNameErrorMessahe}
              onFocus={lastNameFocusHandlur}
              onBlur={lastNameBlurHandler}
              maxLength={60}
              isFocused={lastNameFocus}
              value={lastName}
              onChangeText={lastNameChangeHandler}
            />
            <Info
              title={"Date of Birth"}
              style={{
                title: styles.title,
                subtitle: styles.subtitle,
                container: styles.textContainer,
              }}
            />
            <TextInput
              style={{
                container: styles.textInputContainer,
              }}
              rightIcon={LocalImages.calendarImage}
              isError={dateOfBirthError}
              errorText={dateOfBirthErrorMessage}
              onFocus={dateOfBirthocusHandlur}
              onBlur={dateOfBirthlurHandler}
              maxLength={60}
              isFocused={dateOfBirthFocus}
              value={dateOfBirth}
              onChangeText={dateOfBirthChangeHandler}
            />
            <Info
              title={"Mobile Number"}
              style={{
                title: styles.title,
                subtitle: styles.subtitle,
                container: styles.textContainer,
              }}
            />
            <PhoneInput
              autoFocus={false}
              ref={phoneInput}
              defaultValue={"0000000"}
              defaultCode="IN"
              layout="first"
              onChangeText={(text: any) => {
                setmobileNumber(text);
              }}
              containerStyle={{
                borderColor: Screens.darkGray,
                width: 320,
                borderWidth: 2.2,
                borderRadius: 5,
                height: 65,
                marginLeft: 10,
              }}
              flagButtonStyle={{ backgroundColor: Screens.thickGray }}
              textInputStyle={{ fontSize: 16, padding: 0, margin: 0 }}
              codeTextStyle={{ fontSize: 16, padding: 0, margin: 0 }}
              textContainerStyle={{
                height: 55,
                padding: 0,
                margin: 0,
              }}
              withShadow
            />
            <Info
              title={"Email"}
              style={{
                title: styles.title,
                subtitle: styles.subtitle,
                container: styles.textContainer,
              }}
            />
            <TextInput
              style={{
                container: styles.textInputContainer,
              }}
              isError={isfullNameError}
              errorText={isfullNameErrorMessage}
              onFocus={fullNameFocusHandlur}
              onBlur={fullNameBlurHandler}
              maxLength={60}
              isFocused={fullNameFocus}
              value={fullName}
              onChangeText={fullNameChangeHandler}
            />
          </View>
          <Button
            onPress={_navigateAction}
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
            title={"GENERATE GLOBAL ID"}
          ></Button>
          <Text
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
            {"I Already have my "}
            <Text style={{ color: Screens.colors.primary }}>{"GlobaliD"}</Text>
          </Text>
          <Loader
            loadingText="Your Global ID is generated successfully."
            Status="Success !"
            isLoaderVisible={isLoading}
          ></Loader>
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
    color: Screens.black,
    fontWeight: "400",
    fontSize: 13,
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
    borderColor: Screens.darkGray,
    borderWidth: 2,
    marginLeft: 10,
    marginTop: -2,
  },
});

export default Register;
