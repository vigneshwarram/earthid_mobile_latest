import { values } from "lodash";
import React from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import Header from "../../components/Header";
import Info from "../../components/Info";
import { LocalImages } from "../../constants/imageUrlConstants";
import { SCREENS } from "../../constants/Labels";
import { Screens } from "../../themes";

interface IHomeScreenProps {
  navigation?: any;
}

const ProfileScreen = ({ navigation }: IHomeScreenProps) => {
  const _toggleDrawer = () => {
    navigation.toggleDrawer();
  };
  const _letfIconPress = () => {
    navigation.goBack();
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

  const _keyExtractor = ({ title }: any) => title.toString();

  return (
    <View style={styles.sectionContainer}>
      <Header
        absoluteCircleInnerImage={LocalImages.cameraImage}
        isProfileAvatar={true}
        isUploaded={true}
        letfIconPress={_letfIconPress}
        rewardPoints={"50"}
        leftIconSource={LocalImages.backImage}
        rightIconSource={LocalImages.giftBoxImage}
        isAvatar
        onpress={_toggleDrawer}
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
          <Text style={[styles.label, { fontSize: 16 }]}>37578810</Text>
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
          title={"Full Name"}
          subtitle={"Robert Downey"}
          style={{
            title: styles.title,
            subtitle: styles.subtitle,
            container: styles.textContainer,
          }}
        />
        <Info
          title={"Date of Birth"}
          subtitle={"22/02/1995"}
          style={{
            title: styles.title,
            subtitle: styles.subtitle,
            container: styles.textContainer,
          }}
        />
        <Info
          title={"Mobile Number"}
          subtitle={"7373834595"}
          subtitleRowText={"verified"}
          style={{
            title: styles.title,
            subtitle: styles.subtitle,
            container: styles.textContainer,
            subtitleNearText: styles.subtitleNearText,
          }}
        />
        <Info
          title={"Email"}
          subtitle={"vickyrams20@gmail.com"}
          subtitleRowText={"verified"}
          style={{
            title: styles.title,
            subtitle: styles.subtitle,
            container: styles.textContainer,
            subtitleNearText: styles.subtitleNearText,
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
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
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
    flex: 0.9,
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
    borderRadius: 20,
    marginHorizontal: 8,
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
