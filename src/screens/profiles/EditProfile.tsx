import { values } from "lodash";
import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, FlatList, ScrollView } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Avatar from "../../components/Avatar";
import BottomSheet from "../../components/Bottomsheet";
import Header from "../../components/Header";
import Info from "../../components/Info";
import { LocalImages } from "../../constants/imageUrlConstants";
import { SCREENS } from "../../constants/Labels";
import { Screens } from "../../themes";
import useFormInput from "../../hooks/use-text-input";
import { nameValidator } from "../../utils/inputValidations";
import TextInput from "../../components/TextInput";
import Loader from "../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { byPassUserDetailsRedux } from "../../redux/actions/authenticationAction";

interface IHomeScreenProps {
  navigation?: any;
}

const EditProfile = ({ navigation }: IHomeScreenProps) => {
  const [isCameraOptionVisible, setisCameraOptionVisible] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const phoneInput: any = useRef();
  const userDetails = useAppSelector((state) => state.account);

  const _letfIconPress = () => {
    navigation.goBack();
  };
  const _navigateAction = () => {
    let overallResponseData = {
      ...userDetails.responseData,
      ...{ username: fullName },
    };
    dispatch(byPassUserDetailsRedux(overallResponseData)).then(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigation.goBack();
      }, 5000);
    });
  };

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
  } = useFormInput(userDetails?.responseData?.username, true, nameValidator);

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
  } = useFormInput("22/02/1995", true, nameValidator);

  const socialMedialList = values(SCREENS.HOMESCREEN.SocialMedialList).map(
    ({ TITLE: title, URI: uri, DOMAIN: domain }: any) => ({
      title,
      uri,
      domain,
    })
  );
  const [medialList, setmedialList] = useState(socialMedialList);

  const onChangeHandler = (text: string, indexofItem: number) => {
    const mediListLocal = socialMedialList.map((item, index) => {
      if (indexofItem === index) {
        item.domain = text;
      }

      return item;
    });
    setmedialList([...mediListLocal]);
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <View>
        <Text style={[styles.categoryHeaderText, { fontSize: 13 }]}>
          {item.title}
        </Text>

        <TextInput
          style={{
            container: styles.containerForSocialMedia,
            leftIconStyle: {
              width: 15,
              height: 15,
              marginTop: 3,
              tintColor: Screens.grayShadeColor,
            },
          }}
          leftIcon={item.uri}
          value={item.domain}
          onChangeText={(text) => onChangeHandler(text, index)}
        />
      </View>
    );
  };

  const ColoumnOption = ({ icon, title }: any) => (
    <View>
      <Avatar
        isUploaded={false}
        iconSource={icon}
        style={{
          container: [styles.avatarContainer],
          imgContainer: styles.avatarImageContainer,
        }}
      />
      <Text style={[styles.label, { fontSize: 12, textAlign: "center" }]}>
        {title}
      </Text>
    </View>
  );

  const _keyExtractor = ({ title }: any) => title.toString();

  const _avatarClick = () => {
    setisCameraOptionVisible(true);
  };

  return (
    <View style={styles.sectionContainer}>
      <ScrollView contentContainerStyle={styles.sectionContainer}>
        <Header
          actionIcon={LocalImages.tikImage}
          avatarClick={_avatarClick}
          absoluteCircleInnerImage={LocalImages.cameraImage}
          isProfileAvatar={true}
          isUploaded={true}
          letfIconPress={_letfIconPress}
          leftIconSource={LocalImages.backImage}
          isAvatar
          onpress={_navigateAction}
          linearStyle={styles.linearStyle}
          containerStyle={{
            iconStyle: {
              width: 15,
              height: 15,
            },
            iconContainer: styles.alignCenter,
          }}
        ></Header>
        <View style={styles.category}>
          <Info
            title={"User Name"}
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

        <BottomSheet
          onClose={() => setisCameraOptionVisible(false)}
          height={150}
          isVisible={isCameraOptionVisible}
        >
          <View
            style={{
              height: 100,
              width: "100%",
              paddingHorizontal: 50,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <ColoumnOption
              title={"Remove phone"}
              icon={LocalImages.deleteImage}
            />
            <ColoumnOption title={"Camera"} icon={LocalImages.cameraImage} />
            <ColoumnOption title={"Gallery"} icon={LocalImages.galleryImage} />
          </View>
        </BottomSheet>
        <View style={styles.socialMediaContainer}>
          <FlatList<any>
            nestedScrollEnabled
            data={medialList}
            renderItem={_renderItem}
            keyExtractor={_keyExtractor}
          />
        </View>
        <Loader
          loadingText="Your Profile Details Updated successfully."
          Status="Success !"
          isLoaderVisible={isLoading}
        ></Loader>
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
  socialMediaContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    elevation: 5,
    backgroundColor: Screens.pureWhite,
    borderRadius: 10,
    justifyContent: "center",
    paddingBottom: 30,
  },
  subtitleNearText: {
    color: Screens.success,
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 14,
    opacity: 1,
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
    marginTop: -35,
    marginHorizontal: 10,
    elevation: 5,
    borderRadius: 10,
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

export default EditProfile;
