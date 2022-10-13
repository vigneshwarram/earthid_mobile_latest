import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Screens } from "../../themes";
import { LocalImages } from "../../constants/imageUrlConstants";
import PhoneInput from "react-native-phone-number-input";
import Button from "../../components/Button";
import AnimatedLoader from "../../components/Loader/AnimatedLoader";
import GenericText from "../../components/Text";
import { useAppSelector } from "../../hooks/hooks";
import { useFetch } from "../../hooks/use-fetch";
import { updatephoneOtp } from "../../utils/earthid_account";

const EditMobileNumber = (props: any) => {
  const [callingCode, setcallingCode] = useState<string>("1");
  const phoneInput: any = useRef();
  const userDetails = useAppSelector((state) => state.account);
  const { loading, data, error, fetch } = useFetch();
  const [phone, setPhone] = useState<string>("");

  const sentOtp = () => {
    var postData = {
      oldPhone: userDetails?.responseData?.phone,
      newPhone: phone,
      newCountryCode: "+" + callingCode,
      earthId: userDetails?.responseData?.earthId,
      publicKey: userDetails?.responseData?.publicKey,
      oldCountryCode: userDetails?.responseData?.countryCode,
    };
    console.log("postData", postData);
    fetch(updatephoneOtp, postData, "POST");
  };

  const navigateAction = () => {
    if (phone.length === 10) {
      sentOtp();
    } else {
      Alert.alert("Invalid mobile number");
    }
  };

  useEffect(() => {
    console.log("data", data);
    if (data) {
      props.navigation.navigate("EditMobileNumOtp", {
        newPhone: phone,
        callingCode,
      });
    }
  }, [data]);

  return (
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
          {"updatemobileno"}
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
        {"plsenternewmobile"}
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
        {"mobileno"}
      </GenericText>

      <PhoneInput
        onChangeCountry={(code) => {
          const { callingCode } = code;
          setcallingCode(callingCode[0]);
          console.log("code==>", callingCode[0]);
        }}
        autoFocus={false}
        ref={phoneInput}
        defaultValue={""}
        placeholder="Mobile Number"
        defaultCode="US"
        layout="first"
        onChangeText={(text: any) => {
          setPhone(text);
        }}
        containerStyle={{
          borderColor: Screens.darkGray,
          width: "90%",
          borderWidth: 2,
          borderRadius: 5,
          height: 55,
          marginLeft: 15,
          marginEnd: 15,
          marginTop: 12,
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
      <View style={{ paddingHorizontal: 15, marginTop: 100 }}>
        <Button
          onPress={navigateAction}
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
  );
};

export default EditMobileNumber;

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
});
