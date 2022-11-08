import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import GenericText from "../../components/Text";
import { Screens } from "../../themes";
import { LocalImages } from "../../constants/imageUrlConstants";
import PhoneInput from "react-native-phone-number-input";
import Button from "../../components/Button";
import AnimatedLoader from "../../components/Loader/AnimatedLoader";
import TextInput from "../../components/TextInput";
import { useFetch } from "../../hooks/use-fetch";
import { useAppSelector } from "../../hooks/hooks";
import { updateEmailOtp } from "../../utils/earthid_account";
import useFormInput from "../../hooks/use-text-input";
import { emailValidator } from "../../utils/inputValidations";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";

const EditEmailAddress = (props: any) => {
  const { loading, data, error, fetch } = useFetch();
  const userDetails = useAppSelector((state) => state.account);
  const navigateAction = () => {};

  const _navigateAction = () => {
    if (isValid()) {
      sendOtp();
    } else {
      emailBlurHandler();
    }
  };

  const isValid = () => {
    if (!emailValidator(email, true).hasError) {
      return true;
    }
    return false;
  };
  const sendOtp = () => {
    var postData = {
      oldEmail: userDetails?.responseData?.email,
      newEmail: email,
      earthId: userDetails?.responseData?.earthId,
      publicKey: userDetails?.responseData?.publicKey,
    };
    fetch(updateEmailOtp, postData, "POST");
  };
  useEffect(() => {
    console.log("data", data);
    if (data) {
      props.navigation.navigate("EditEmailAddOtp", { newEmail: email });
    }
  }, [data]);
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
  } = useFormInput("", true, emailValidator);

  return (
    <KeyboardAvoidingScrollView style={styles.sectionContainer}>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeaderContainer}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={styles.logoContainer}
              source={LocalImages.backImage}
            ></Image>
          </TouchableOpacity>
          <GenericText
            style={[
              {
                fontSize: 20,
                color: Screens.pureWhite,
                fontWeight: "500",
                marginLeft: -10,
              },
            ]}
          >
            {"updateemailadd"}
          </GenericText>

          <View />
        </View>

        <GenericText
          style={[
            {
              fontSize: 16,
              color: Screens.black,
              fontWeight: "500",
              alignSelf: "center",
              marginTop: 15,
            },
          ]}
        >
          {"plsenternewemailadd"}
        </GenericText>

        <GenericText
          style={[
            {
              fontSize: 13,
              marginTop: 20,
              paddingHorizontal: 15,
            },
          ]}
        >
          {"email"}
        </GenericText>

        <TextInput
          style={{
            container: styles.textInputContainer,
          }}
          isError={isemailError}
          errorText={isemailErrorMessage}
          onFocus={emailFocusHandlur}
          onBlur={emailBlurHandler}
          maxLength={60}
          isFocused={emailFocus}
          value={email}
          onChangeText={emailChangeHandler}
        />

        <View style={{ paddingHorizontal: 15, marginTop: 100 }}>
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
            title={"submt"}
          ></Button>
        </View>

        <AnimatedLoader isLoaderVisible={loading} loadingText="Loading..." />
      </View>
    </KeyboardAvoidingScrollView>
  );
};

export default EditEmailAddress;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.colors.background,
  },
  logoContainer: {
    width: 25,
    height: 25,
    tintColor: "#fff",
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
  textInputContainer: {
    borderRadius: 10,
    borderColor: Screens.thickGray,
    borderWidth: 2,
    marginLeft: 10,
    marginTop: 10,
  },
});
