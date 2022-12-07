import { values } from "lodash";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Avatar from "../../components/Avatar";
import BottomSheet from "../../components/Bottomsheet";
import Header from "../../components/Header";
import Info from "../../components/Info";
import { LocalImages } from "../../constants/imageUrlConstants";
import { SCREENS } from "../../constants/Labels";
import { Screens } from "../../themes";
import DocumentPicker from "react-native-document-picker";
import useFormInput from "../../hooks/use-text-input";
import { nameValidator } from "../../utils/inputValidations";
import TextInput from "../../components/TextInput";
import Loader from "../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { byPassUserDetailsRedux } from "../../redux/actions/authenticationAction";
import { useTheme } from "@react-navigation/native";
import { savingProfilePictures } from "../../redux/actions/LocalSavingActions";
import { RNCamera } from "react-native-camera";
import GenericText from "../../components/Text";
import * as ImagePicker from "react-native-image-picker";
interface IHomeScreenProps {
  navigation?: any;
}

const EditProfile = ({ navigation }: IHomeScreenProps) => {
  const [isCameraOptionVisible, setisCameraOptionVisible] =
    useState<boolean>(false);
  const disPatch = useAppDispatch();
  const profilePicture = useAppSelector((state) => state.savedPic);
  const [isCamerVisible, setIsCameraVisible] = useState(false);
  const camRef: any = useRef();
  console.log("profilePicture", profilePicture);
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const phoneInput: any = useRef();
  const [cameraDataUri, setcameraDataUri] = useState();
  const userDetails = useAppSelector((state) => state.account);
  const [Response, setResponse] = useState<any>("");
  const [focus, setFocus] = useState<any>("");
  const [nameFocus, setNameFocus] = useState<boolean>("");
  const _letfIconPress = () => {
    navigation.goBack();
  };
  const _navigateAction = () => {
    let overallResponseData = {
      ...userDetails.responseData,
      ...{ username: fullName },
    };
    disPatch(byPassUserDetailsRedux(overallResponseData)).then(() => {
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
  const openCamera = async () => {
    const options = { quality: 0.1, base64: true };
    const data = await camRef.current.takePictureAsync(options);
    console.log("data", data);
    if (data) {
      disPatch(savingProfilePictures(data?.uri));
      setIsCameraVisible(false);
      setcameraDataUri(data?.uri);
    }
  };
  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "EarthId Storage Acess",
          message: "EarthId needs access to your storage ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const openFilePicker = async () => {
    if (Platform.OS == "android") {
      await requestPermission();
    }
    try {
      ImagePicker.launchImageLibrary(
        ImagePicker.ImageLibraryOptions,
        setResponse
      );

      // const resp: any = await DocumentPicker.pick({
      //   type: [DocumentPicker.types.images, DocumentPicker.types.images],
      //   readContent: true,
      // });

      // let fileUri = resp[0].uri;
      // disPatch(savingProfilePictures(fileUri));
      // setIsCameraVisible(false);
      // setcameraDataUri(fileUri);
    } catch (err) {
      console.log("data==>", err);
    }
  };
  useEffect(() => {
    if (Response != "") {
      if(Response?.assets?.length>0){
        console.log("==>result", Response?.assets[0]?.uri);
        let fileUri = Response?.assets[0]?.uri;
        disPatch(savingProfilePictures(fileUri));
        setIsCameraVisible(false);
        setcameraDataUri(fileUri);
        setisCameraOptionVisible(false);
      }
   
    }
  }, [Response]);
  const _renderItem = ({ item, index }: any) => {
    return (
      <View>
        <GenericText style={[styles.categoryHeaderText, { fontSize: 13 }]}>
          {item.title}
        </GenericText>

        <TextInput
          style={{
            container: [
              styles.containerForSocialMedia,
              {
                borderColor:
                  focus === index
                    ? Screens.colors.primary
                    : Screens.grayShadeColor,
                borderWidth: focus === index ? 2 : 1,
              },
            ],
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
          onFocus={() => setFocus(index) }
          onBlur={()=>setFocus(false)}
          // isFocused={true}
        />
      </View>
    );
  };

  const ColoumnOption = ({ icon, title, avatarClick }: any) => (
    <View>
      <Avatar
        avatarClick={avatarClick}
        isUploaded={false}
        iconSource={icon}
        style={{
          container: [styles.avatarContainer],
          imgContainer: styles.avatarImageContainer,
        }}
      />
      <GenericText
        style={[styles.label, { fontSize: 12, textAlign: "center" }]}
      >
        {title}
      </GenericText>
    </View>
  );

  const _keyExtractor = ({ title }: any) => title.toString();

  const _avatarClick = () => {
    setisCameraOptionVisible(true);
  };

  return (
    <View style={styles.sectionContainer}>
      {isCamerVisible ? (
        <View style={{ flex: 1 }}>
          <View
            style={{ position: "absolute", top: 20, right: 20, zIndex: 100 }}
          >
            <TouchableOpacity onPress={() => setIsCameraVisible(false)}>
              <Image
                resizeMode="contain"
                style={[[styles.logoContainer, { tintColor: "#fff" }]]}
                source={LocalImages.closeImage}
              ></Image>
            </TouchableOpacity>
          </View>
          <RNCamera
            ref={camRef}
            style={styles.preview}
            androidCameraPermissionOptions={null}
            type={RNCamera.Constants.Type.front}
            captureAudio={false}
          ></RNCamera>
          <View style={{ backgroundColor: "#000" }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.primary,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => openCamera()}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderColor: "#fff",
                    borderWidth: 1,
                    borderRadius: 25,
                    backgroundColor: "transparent",
                  }}
                ></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.sectionContainer}>
          <Header
            picUri={profilePicture?.profileData}
            actionIcon={LocalImages.tikImage}
            avatarClick={_avatarClick}
            absoluteCircleInnerImage={LocalImages.cameraImage}
            isProfileAvatar={true}
            isUploaded={true}
            letfIconPress={_letfIconPress}
            leftIconSource={LocalImages.backImage}
            isAvatar
            isBack
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
              title={"username"}
              style={{
                title: styles.title,
                subtitle: styles.subtitle,
                container: styles.textContainer,
              }}
            />

            <TextInput
              style={{
                container: [
                  styles.textInputContainer,
                  {
                    borderColor: nameFocus
                      ? Screens.colors.primary
                      : Screens.grayShadeColor,
                    borderWidth: nameFocus ? 2 : 1,
                  },
                ],
              }}
              isError={isfullNameError}
              errorText={isfullNameErrorMessage}
              onFocus={fullNameFocusHandlur}
              onBlur={fullNameBlurHandler}
              // onFocus={() => setNameFocus(true)}
              // onBlur={() => setNameFocus(false)}
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
                avatarClick={() => {
                  setisCameraOptionVisible(false);
                  disPatch(savingProfilePictures(undefined));
                }}
                title={"removephone"}
                icon={LocalImages.deleteImage}
              />

              <ColoumnOption
                avatarClick={() => {
                  setisCameraOptionVisible(false);
                  setIsCameraVisible(true);
                }}
                title={"camera"}
                icon={LocalImages.cameraImage}
              />

              <ColoumnOption
                avatarClick={() => {
                  //  setisCameraOptionVisible(false);
                  openFilePicker();
                }}
                title={"gallery"}
                icon={LocalImages.galleryImage}
              />
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
      )}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    height: 310,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoContainers: {
    width: 30,
    height: 30,
    tintColor: Screens.grayShadeColor,
  },
  preview: {
    flex: 1,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  logoContainer: {
    width: 30,
    height: 30,
    tintColor: Screens.colors.primary,
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
