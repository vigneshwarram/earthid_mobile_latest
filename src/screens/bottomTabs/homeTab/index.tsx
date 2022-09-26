import { values } from "lodash";
import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { EventRegister } from "react-native-event-listeners";

import Avatar from "../../../components/Avatar";
import Card from "../../../components/Card";
import Header from "../../../components/Header";
import AnimatedLoader from "../../../components/Loader/AnimatedLoader";
import GenericText from "../../../components/Text";
import { LocalImages } from "../../../constants/imageUrlConstants";
import { SCREENS } from "../../../constants/Labels";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getHistory } from "../../../redux/actions/authenticationAction";
import { Screens } from "../../../themes";
import { alertBox } from "../../../utils/earthid_account";

interface IHomeScreenProps {
  navigation?: any;
}

const HomeScreen = ({ navigation }: IHomeScreenProps) => {
  const userDetails = useAppSelector((state) => state.account);
  const getHistoryReducer = useAppSelector((state) => state.getHistoryReducer);
  const dispatch = useAppDispatch();
  const _toggleDrawer = () => {
    navigation.openDrawer();
  };
  console.log("userDetails", userDetails);
  const categoryList = values(SCREENS.HOMESCREEN.categoryList).map(
    ({ TITLE: title, URI: uri, COLOR: color }: any) => ({
      title,
      uri,
      color,
    })
  );
  const documentList = values(SCREENS.HOMESCREEN.DocumentList).map(
    ({ TITLE: title, URI: uri, COLOR: color }: any) => ({
      title,
      uri,
      color,
    })
  );

  const _renderItem = ({ item }: any) => {
    return (
      <Avatar
        isCategory={true}
        isUploaded={false}
        text={item.title}
        iconSource={item.uri}
        style={{
          container: [styles.avatarContainer, { backgroundColor: item.color }],
          imgContainer: styles.avatarImageContainer,
          text: styles.avatarTextContainer,
        }}
      />
    );
  };

  const _renderItemDocuments = ({ item }: any) => {
    return (
      <View style={styles.documentContainer}>
        <Card
          title={item.title}
          leftIconSrc={item.uri}
          style={styles.cardContainer}
        />
      </View>
    );
  };

  const _avatarClick = () => {
    navigation.navigate("ProfileScreen");
  };

  useEffect(() => {
    const listener: any = EventRegister.addEventListener("OpenDrawer", () => {
      navigation.openDrawer();
      return;
    });
    return () => {
      EventRegister.removeEventListener(listener);
      listener;
    };
  });

  useEffect(() => {
    const PayLoad = {
      userId: userDetails?.responseData?.Id,
      publicKey: userDetails?.responseData?.publicKey,
    };
    dispatch(getHistory(PayLoad));
  }, []);

  const _renderItemHistory = ({ item }: any) => {
    return (
      <Card
        leftAvatar={LocalImages.documentsImage}
        absoluteCircleInnerImage={LocalImages.upImage}
        rightIconSrc={LocalImages.menuImage}
        title={item?.eventValue}
        subtitle={`       Uploaded  : ${item.createdAt}`}
        style={{
          ...styles.cardContainers,
          ...{
            avatarContainer: {
              backgroundColor: "rgba(245, 188, 232, 1)",
              width: 50,
              height: 50,
              borderRadius: 25,
              marginTop: 25,
            },
            uploadImageStyle: {
              backgroundColor: "rgba(245, 188, 232, 1)",
            },
          },
        }}
      />
    );
  };

  return (
    <View style={styles.sectionContainer}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 200,
          backgroundColor: "#fff",
        }}
      >
        <View>
          <Header
            leftIconSource={LocalImages.logoImage}
            rewardPoints={"50"}
            rightIconSource={LocalImages.giftBoxImage}
            isAvatar
            avatarClick={_avatarClick}
            onpress={() => {
              _toggleDrawer();
            }}
            linearStyle={styles.linearStyle}
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
          <GenericText style={[styles.categoryHeaderText, { fontSize: 13 }]}>
            {SCREENS.HOMESCREENTITLES.CATEGORIES}
          </GenericText>
          <View style={[styles.flatPanel, { height: 130, marginTop: -10 }]}>
            <FlatList<any>
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categoryList}
              renderItem={_renderItem}
            />
          </View>
          <GenericText style={[styles.categoryHeaderText, { fontSize: 13 }]}>
            {SCREENS.HOMESCREEN.documentLabel}
          </GenericText>
          <FlatList<any>
            showsHorizontalScrollIndicator={false}
            data={
              getHistoryReducer && getHistoryReducer?.responseData
                ? getHistoryReducer.responseData
                : []
            }
            renderItem={_renderItemHistory}
          />
          {/* <AnimatedLoader
            isLoaderVisible={getHistoryReducer?.isLoading}
            loadingText="loading"
          /> */}
          {!getHistoryReducer && !getHistoryReducer?.responseData && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                resizeMode="contain"
                style={[styles.logoContainer]}
                source={LocalImages.recent}
              ></Image>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.colors.background,
  },
  linearStyle: {
    height: 330,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: "#000",
  },
  logoContainer: {
    width: 200,
    height: 150,
    resizeMode: "contain",
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: "#000",
  },
  alignCenter: { justifyContent: "center", alignItems: "center" },
  label: {
    fontWeight: "bold",
    color: Screens.black,
  },
  categoryHeaderText: {
    marginHorizontal: 30,
    marginVertical: 20,
    color: Screens.headingtextColor,
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
  cardContainers: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 10,

    alignItems: "center",
    borderRadius: 20,
    backgroundColor: Screens.pureWhite,
    title: {
      color: Screens.black,
    },
    textContainer: {
      justifyContent: "center",
      alignItems: "center",
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
  },
});

export default HomeScreen;
