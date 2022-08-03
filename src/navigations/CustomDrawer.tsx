import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
} from "react-native";
import { Screens } from "../themes/index";
import { values } from "lodash";
import { LocalImages } from "../constants/imageUrlConstants";
import Card from "../components/Card";
import { ABOUT_ROUTES } from "../constants/Routes";
import { StackActions } from "@react-navigation/native";

const CustomDrawer = (props: any) => {
  const aboutList = values(ABOUT_ROUTES).map(
    ({
      CARD: card,
      TITLE: title,
      SCREEN: route,
      COLOR: color,
      URI: uri,
      RIGHT_ICON: rightUri,
    }: any) => ({
      card,
      title,
      route,
      uri,
      rightUri,
      color,
    })
  );

  const _navigateAction = (item: any) => {
    if (item.route === "Logout") {
      props.navigation.dispatch(StackActions.replace("AuthStack"));
    } else {
      props.navigation.navigate(item.route);
    }
  };
  const _renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => _navigateAction(item)}>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          margin: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={[styles.avatarContainer, { backgroundColor: item.color }]}
          >
            <Image
              resizeMode="contain"
              style={styles.avatarImageContainer}
              source={item.uri}
            ></Image>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={[
                {
                  fontSize: 14,
                  marginHorizontal: 10,

                  color: Screens.black,
                  fontWeight: "500",
                },
              ]}
            >
              {item.title}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            resizeMode="contain"
            style={styles.avatarImageContainer}
            source={item.rightUri}
          ></Image>
        </View>
      </View>
    </TouchableOpacity>
  );
  const _keyExtractor = ({ title }: any) => title.toString();
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeaderContainer}>
        <Image
          resizeMode="contain"
          style={styles.logoContainer}
          source={LocalImages.logoImage}
        ></Image>
        <TouchableOpacity
          style={styles.closeContainer}
          onPress={() => props.navigation.toggleDrawer()}
        >
          <Image
            resizeMode="contain"
            style={styles.close}
            source={LocalImages.closeImage}
          ></Image>
        </TouchableOpacity>
      </View>
      <FlatList<any>
        data={aboutList}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.colors.background,
  },
  cardContainer: {
    flex: 1,
    margin: 10,
  },
  avatarImageContainer: {
    width: 20,
    height: 20,
  },
  avatarContainer: {
    backgroundColor: "red",
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    height: 120,
    backgroundColor: "#8b88db",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 130,
    height: 120,
  },
  close: {
    width: 15,
    height: 15,
    tintColor: "#fff",
  },
  closeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomDrawer;
