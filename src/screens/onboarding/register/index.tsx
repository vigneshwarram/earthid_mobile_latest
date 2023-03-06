import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
  Text,
  AsyncStorage,
} from "react-native";
import Header from "../../../components/Header";
import { SCREENS } from "../../../constants/Labels";
import { Screens } from "../../../themes";
import Button from "../../../components/Button";
import DatePicker from "react-native-date-picker";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import Info from "../../../components/Info";
import TextInput from "../../../components/TextInput";
import PhoneInput from "react-native-phone-number-input";
import useFormInput from "../../../hooks/use-text-input";
import { emailValidator, nameValidator } from "../../../utils/inputValidations";
import Loader from "../../../components/Loader";
import {
  createAccount,
  GeneratedKeysAction,
} from "../../../redux/actions/authenticationAction";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { IUserAccountRequest } from "../../../typings/AccountCreation/IUserAccount";
import { getDeviceId, getDeviceName } from "../../../utils/encryption";
import GenericText from "../../../components/Text";
import { SnackBar } from "../../../components/SnackBar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { isArray } from "lodash";
import { useFetch } from "../../../hooks/use-fetch";
import { superAdminApi } from "../../../utils/earthid_account";
import { isEarthId } from "../../../utils/PlatFormUtils";
import Spinner from "react-native-loading-spinner-overlay/lib";
interface IRegister {
  navigation: any;
}

const Register = ({ navigation }: IRegister) => {
  const phoneInput: any = useRef();
  const dispatch = useAppDispatch();
  const {
    loading: superAdminLoading,
    data: superAdminResponse,
    fetch: getSuperAdminApiCall,
  } = useFetch();
  const [mobileNumber, setmobileNumber] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState(false);
  const userDetails = useAppSelector((state) => state.account);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const keys = useAppSelector((state) => state.user);
  const [successResponse, setsuccessResponse] = useState(false);
  const [openDatePicker, setopenDatePicker] = useState<boolean>();
  const [callingCode, setcallingCode] = useState<string>("1");
  const [isValidMobileNumber, setValidMobileNumber] = useState<boolean>(false);
  const [isMobileEmpty, setMobileEmpty] = useState<boolean>(false);
  const {
    value: firstName,
    isFocused: firstNameFocus,
    validationResult: {
      hasError: isfirstNameError,
      errorMessage: isfirstNameErrorMessage,
    },
    valueChangeHandler: firstNameChangeHandler,
    inputFocusHandler: firstNameFocusHandlur,
    inputBlurHandler: firstNameBlurHandler,
  } = useFormInput("", true, nameValidator);

  const {
    valueChangeHandler: dateOfBirthChangeHandler,
    inputBlurHandler: dateOfBirthlurHandler,
  } = useFormInput("", true, nameValidator);
  const {
    value: email,
    isFocused: emailFocus,
    validationResult: {
      hasError: isemailError,
      errorMessage: isemailErrorMessage,
    },
    valueChangeHandler: emailChangeHandler,
    inputFocusHandler: emailFocusHandlur,
    inputBlurHandler: emailBlurHandler,
  } = useFormInput("", false, emailValidator);

  useEffect(() => {
    getSuperAdminApiCall(superAdminApi, {}, "GET");
  }, []);

  useEffect(()=>{
  getItem()
  },[])

  const getItem=async()=>{
    const item =await  AsyncStorage.getItem("flow");
    if(item=='documentflow'){
      const name =await  AsyncStorage.getItem("userDetails");
      firstNameChangeHandler(name)
    }
  }

  const _navigateAction = () => {
    setKeyboardVisible(false);
    mobileNumber == "" ? setMobileEmpty(true) : null;
    if (isValid()) {
      setLoginLoading(true);
      dispatch(GeneratedKeysAction());
    } else {
      console.log("its coming");
      firstNameBlurHandler();

      emailBlurHandler();
      dateOfBirthlurHandler();
    }
  };
  const isValid = () => {
    if (
      !nameValidator(firstName, true).hasError &&
      !emailValidator(email, true).hasError &&
      mobileNumber !== "" &&
      !isValidMobileNumber
    ) {
      return true;
    }
    return false;
  };

  const _registerAction = async ({ publicKey }: any) => {
    const token = await getDeviceId();
    const deviceName = await getDeviceName();
    if (superAdminResponse && superAdminResponse[0]?.Id) {
      const payLoad: IUserAccountRequest = {
        username: firstName,
        deviceID: token + Math.random(),
        deviceIMEI: token,
        deviceName: deviceName,
        email: email,
        orgId: superAdminResponse[0]?.Id,
        phone: mobileNumber,
        countryCode: "+" + callingCode,
        publicKey,
        deviceOS: Platform.OS === "android" ? "android" : "ios",
      };

      dispatch(createAccount(payLoad)).then(async() => {
        await  AsyncStorage.setItem("flow","loginflow");
        setLoginLoading(false);
      });
    } else {
      setLoginLoading(false);
      SnackBar({
        indicationMessage: "Registered Id is not generated ,please try again",
        doRetry: getSuperAdminApiCall(superAdminApi, {}, "GET"),
      });
    }
  };

  if (keys && keys?.isGeneratedKeySuccess) {
    keys.isGeneratedKeySuccess = false;

    _registerAction(keys?.responseData?.result);
  }

  if (userDetails && userDetails?.isAccountCreatedSuccess) {
    setsuccessResponse(true);
    userDetails.isAccountCreatedSuccess = false;

    if (userDetails?.responseData) {
      setTimeout(() => {
        setsuccessResponse(false);
       
        navigation.navigate("BackupIdentity");
      }, 3000);
    }
  }
  if (userDetails && userDetails?.isAccountCreatedFailure) {
    userDetails.isAccountCreatedFailure = false;
    if (userDetails?.errorMesssage && isArray(userDetails?.errorMesssage)) {
      SnackBar({
        indicationMessage: userDetails?.errorMesssage[0],
      });
    } else {
      console.log("userDetails?.errorMesssage", userDetails?.errorMesssage);
     Alert.alert("Warning","Your EarthID already exists. Please recover it using your QR code generated during the registration process. If you have lost your QR code, please create a new EarthID using different username, email and phone number.")
    }
  }
  const Footer = () => (
    <View style={{ marginHorizontal: 20, backgroundColor: "#fff" }}>
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
        title={isEarthId() ? "generateeathid" : "generateglobalid"}
      ></Button>
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
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
            {"alreadyhavemy"}
          </GenericText>
          <GenericText
            style={{
              color: Screens.colors.primary,
              alignSelf: "center",
              textDecorationLine: "underline",
            }}
          >
            {isEarthId() ? "EarthID" : "GlobaliD"}
          </GenericText>
        </View>
      </TouchableOpacity>
    </View>
  );

  const onchangeFirstNameHandler = () => {
    setKeyboardVisible(true);
    firstNameFocusHandlur();
  };
  const onBlurFirstName = () => {
    setKeyboardVisible(false);
    firstNameBlurHandler();
  };
  const onchangeEmailHandler = () => {
    setKeyboardVisible(true);
    emailFocusHandlur();
  };
  const onBlurEmailName = () => {
    setKeyboardVisible(false);
    emailBlurHandler();
  };
  const onMobileNumberFocus = () => {
    setKeyboardVisible(true);
  };
  const onMobileNumberBlur = () => {
    setKeyboardVisible(false);
  };
  function containsSpecialChars(str: string) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~a-zA-Z " "]/;
    return specialChars.test(str);
  }

  return (
    <KeyboardAvoidingScrollView
      style={{ paddingBottom: 1000 }}
      stickyFooter={isKeyboardVisible && <Footer />}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Screens.colors.background,
          paddingBottom: 1000,
        }}
      >
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
            <Info
              title={"username"}
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
              placeholder={"Enter Username"}
              isError={isfirstNameError}
              errorText={isfirstNameErrorMessage}
              onFocus={onchangeFirstNameHandler}
              onBlur={onBlurFirstName}
              maxLength={60}
              isFocused={firstNameFocus}
              value={firstName}
              onChangeText={firstNameChangeHandler}
            />
            <Info
              title={"mobileno"}
              style={{
                title: styles.title,
                subtitle: styles.subtitle,
                container: styles.textContainer,
              }}
            />

            <PhoneInput
              textInputProps={{
                onFocus: onMobileNumberFocus,
                onBlur: onMobileNumberBlur,
                allowFontScaling: false,
                maxLength: 10,
              }}
              onChangeCountry={(code) => {
                const { callingCode } = code;
                setcallingCode(callingCode[0]);
                console.log("code==>", callingCode[0]);
              }}
              autoFocus={false}
              placeholder="Mobile number"
              ref={phoneInput}
              defaultCode="US"
              layout="first"
              onChangeText={(text: any) => {
                //var format = text.replace(/[^0-9]/g, "");
                let validate = containsSpecialChars(text);
                console.log("==>format", validate);
                setValidMobileNumber(validate);
                setmobileNumber(text);
                setMobileEmpty(false);
              }}
              containerStyle={{
                borderColor:
                  isValidMobileNumber || isMobileEmpty
                    ? Screens.red
                    : Screens.darkGray,
                borderWidth: isValidMobileNumber ? 1 : 2.2,
                borderRadius: 10,
                height: 60,
                marginHorizontal: 10,
              }}
              flagButtonStyle={{
                backgroundColor: Screens.thickGray,
                borderBottomLeftRadius: 9,
                borderTopLeftRadius: 9,
              }}
              textInputStyle={{ fontSize: 16, padding: 0, margin: 0 }}
              codeTextStyle={{ fontSize: 16, padding: 0, margin: 0 }}
              textContainerStyle={{
                height: 55,
                padding: 0,
                margin: 0,
                borderBottomEndRadius: 9,
                borderTopRightRadius: 9,
                backgroundColor: "#fff",
              }}
              filterProps={{ placeholder: "Search country" }}
            />
            {isValidMobileNumber ||
              (isMobileEmpty && (
                <Text allowFontScaling={false} style={styles.errorText}>
                  {"Please enter valid mobile number"}
                </Text>
              ))}
            <Info
              title={"email"}
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
              placeholder={"Enter your Email"}
              isError={isemailError}
              errorText={isemailErrorMessage}
              onFocus={onchangeEmailHandler}
              onBlur={onBlurEmailName}
              maxLength={60}
              isFocused={emailFocus}
              value={email}
              onChangeText={emailChangeHandler}
            />
          </View>
          {!isKeyboardVisible && <Footer />}

          <Loader
            loadingText={
              isEarthId() ? "earthidgeneratesuccess" : "globalgeneratesuccess"
            }
            Status="status"
            isLoaderVisible={successResponse}
          ></Loader>
          {loginLoading && (
            <Spinner
              visible={loginLoading}
              textContent={"Loading..."}
              textStyle={styles.spinnerTextStyle}
            />
          )}
        </View>
        <DatePicker
          modal
          open={openDatePicker}
          date={new Date()}
          onConfirm={(date) => {
            console.log("date");
            setopenDatePicker(false);
            dateOfBirthChangeHandler(date.toDateString());
          }}
          onCancel={() => {
            setopenDatePicker(false);
          }}
        />
      </View>
    </KeyboardAvoidingScrollView>
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
  spinnerTextStyle: {
    color: "#fff",
  },
  linearStyle: {
    height: 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
  },
  categoryHeaderText: {
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
    marginTop: -250,
    marginHorizontal: 15,
    elevation: 5,
    borderRadius: 30,

    justifyContent: "space-between",
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
    height: 60,
  },
  errorText: {
    color: Screens.red,
    marginBottom: 10,
    marginHorizontal: 20,
  },
});

export default Register;
