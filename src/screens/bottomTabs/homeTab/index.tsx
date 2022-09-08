import { values } from "lodash";
import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Alert } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { EventRegister } from "react-native-event-listeners";
import { ScrollView } from "react-native-gesture-handler";
import Avatar from "../../../components/Avatar";
import Card from "../../../components/Card";
import Header from "../../../components/Header";
import GenericText from "../../../components/Text";
import { LocalImages } from "../../../constants/imageUrlConstants";
import { SCREENS } from "../../../constants/Labels";
import { useAppSelector } from "../../../hooks/hooks";
import { Screens } from "../../../themes";
import { alertBox } from "../../../utils/earthid_account";

interface IHomeScreenProps {
  navigation?: any;
}

const HomeScreen = ({ navigation }: IHomeScreenProps) => {
  const userDetails = useAppSelector((state) => state.account);
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

  const _keyExtractor = ({ title }: any) => title.toString();
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.sectionContainer}>
        <Header
          leftIconSource={LocalImages.logoImage}
          rewardPoints={"50"}
          rightIconSource={LocalImages.giftBoxImage}
          isAvatar
          profileName={
            userDetails?.responseData?.firstName +
            " " +
            userDetails?.responseData?.lastName
          }
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
            keyExtractor={_keyExtractor}
          />
        </View>
        <GenericText style={[styles.categoryHeaderText, { fontSize: 13 }]}>
          {SCREENS.HOMESCREEN.documentLabel}
        </GenericText>
        <View>
          <FlatList<any>
            scrollEnabled={false}
            data={documentList}
            renderItem={_renderItemDocuments}
            keyExtractor={_keyExtractor}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.colors.background,
  },
  linearStyle: {
    height: 250,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: "#000",
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
});

export default HomeScreen;
