import { values } from "lodash";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { ScrollView } from "react-native-gesture-handler";
import Avatar from "../../components/Avatar";
import BottomSheet from "../../components/Bottomsheet";
import Header from "../../components/Header";
import Info from "../../components/Info";
import GenericText from "../../components/Text";
import { LocalImages } from "../../constants/imageUrlConstants";
import { SCREENS } from "../../constants/Labels";
import { useAppSelector } from "../../hooks/hooks";
import { useDrawerStatus } from "@react-navigation/drawer";
import { Screens } from "../../themes";

interface IHomeScreenProps {
  navigation?: any;
}

const ProfileScreen = ({ navigation }: IHomeScreenProps) => {
  const userDetails = useAppSelector((state) => state.account);

  const isDrawerOpen = useDrawerStatus() === "open";
  if (isDrawerOpen) {
    navigation.closeDrawer();
  }
  console.log("isDrawerOpen", isDrawerOpen);
  const [isCameraOptionVisible, setisCameraOptionVisible] =
    useState<boolean>(false);
  const _navigateAction = () => {
    navigation.navigate("EditProfileScreen");
  };
  const _letfIconPress = () => {
    navigation.goBack();
  };

  const _navigateEditMobile = () => {
    navigation.navigate("EditMobileNumber");
  };

  const _navigateEditEmail = () => {
    navigation.navigate("EditEmailAddress");
  };

  const socialMedialList = values(SCREENS.HOMESCREEN.SocialMedialList).map(
    ({ TITLE: title, URI: uri }: any) => ({
      title,
      uri,
    })
  );

  const _renderItem = ({ item }: any) => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <Image
          resizeMode="contain"
          style={styles.logoContainers}
          source={item.uri}
        ></Image>
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

  const mobileVerifyAction = () => {
    navigation.navigate("OTPScreen", { type: "phone" });
  };

  const emailVerifyAction = () => {
    navigation.navigate("OTPScreen", { type: "email" });
  };

  const navigateToCustomizedControl = () => {
    navigation.navigate("CustomizeQr");
  };
  useEffect(() => {
    navigation.closeDrawer();
  }, []);
  return (
    <View style={styles.sectionContainer}>
      <ScrollView contentContainerStyle={styles.sectionContainer}>
        <Header
          subCatSideArrowVisible
          actionIcon={LocalImages.editImage}
          avatarClick={_avatarClick}
          absoluteCircleInnerImage={LocalImages.cameraImage}
          isProfileAvatar={true}
          isUploaded={true}
          isBack
          letfIconPress={_letfIconPress}
          rewardPoints={"50"}
          leftIconSource={LocalImages.backImage}
          rightIconSource={LocalImages.giftBoxImage}
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
        <View style={styles.flatPanel}>
          <View style={styles.alignCenter}>
            <Text style={[styles.label, { fontSize: 12 }]}>
              {SCREENS.HOMESCREEN.appName}
            </Text>
            <Text style={[styles.label, { fontSize: 16 }]}>
              {userDetails?.responseData?.earthId}
            </Text>
          </View>
          <CircularProgress
            value={60}
            radius={30}
            activeStrokeWidth={5}
            activeStrokeColor={Screens.colors.primary}
          />
        </View>
        <View style={styles.category}>
          <Info
            title={"username"}
            subtitle={userDetails?.responseData?.username}
            style={{
              title: styles.title,
              subtitle: styles.subtitle,
              container: styles.textContainer,
            }}
          />

          <Info
            tailIconPress={_navigateEditMobile}
            tailIcon={LocalImages.editIcon}
            subTitlePress={
              userDetails?.responseData?.mobileApproved
                ? null
                : mobileVerifyAction
            }
            title={"mobileno"}
            subtitle={
              userDetails?.responseData?.countryCode +
              " " +
              userDetails?.responseData?.phone
            }
            subtitleRowText={
              userDetails?.responseData?.mobileApproved ? "verified" : "verify"
            }
            style={{
              title: styles.title,
              subtitle: styles.subtitle,
              container: styles.textContainer,
              subtitleNearText: [
                styles.subtitleNearText,
                {
                  color: userDetails?.responseData?.mobileApproved
                    ? Screens.success
                    : "red",
                },
              ],
            }}
          />
          <Info
            tailIconPress={_navigateEditEmail}
            tailIcon={LocalImages.editIcon}
            subTitlePress={
              userDetails?.responseData?.emailApproved
                ? null
                : emailVerifyAction
            }
            title={"email"}
            subtitle={userDetails?.responseData?.email}
            subtitleRowText={
              userDetails?.responseData?.emailApproved ? "verified" : "verify"
            }
            style={{
              title: styles.title,
              subtitle: styles.subtitle,
              container: styles.textContainer,
              subtitleNearText: [
                styles.subtitleNearText,
                {
                  color: userDetails?.responseData?.emailApproved
                    ? Screens.success
                    : "red",
                },
              ],
            }}
          />
        </View>
        <View style={styles.socialMediaContainer}>
          <FlatList<any>
            horizontal
            scrollEnabled={false}
            data={socialMedialList}
            renderItem={_renderItem}
            keyExtractor={_keyExtractor}
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
              title={"removephone"}
              icon={LocalImages.deleteImage}
            />
            <ColoumnOption title={"camera"} icon={LocalImages.cameraImage} />
            <ColoumnOption title={"gallery"} icon={LocalImages.galleryImage} />
          </View>
        </BottomSheet>
        <TouchableOpacity onPress={() => navigateToCustomizedControl()}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
              flexDirection: "row",
            }}
          >
            <Image
              resizeMode="contain"
              style={[styles.logoContainer]}
              source={LocalImages.qrcodeImage}
            ></Image>
            <GenericText
              style={[
                styles.label,
                {
                  fontSize: 14,
                  paddingHorizontal: 10,
                  color: Screens.colors.primary,
                  textDecorationLine: "underline",
                },
              ]}
            >
              {"customizeqrcode"}
            </GenericText>
          </View>
        </TouchableOpacity>
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
  logoContainer: {
    width: 30,
    height: 30,
    tintColor: Screens.colors.primary,
  },
  subtitle: {
    color: Screens.black,
    paddingLeft: 20,
    fontWeight: "bold",
    fontSize: 15,
    opacity: 1,
  },
  socialMediaContainer: {
    padding: 25,
    marginHorizontal: 10,
    elevation: 5,
    backgroundColor: Screens.pureWhite,
    borderRadius: 10,
    justifyContent: "center",
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
  },
  alignCenter: { justifyContent: "center", alignItems: "center" },
  label: {
    fontWeight: "bold",
    color: Screens.black,
  },
  category: {
    backgroundColor: Screens.pureWhite,
    padding: 10,
    marginVertical: 20,
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
  documentContainer: {
    borderColor: Screens.colors.primary,
    borderWidth: 0.5,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 20,
  },
});

export default ProfileScreen;
