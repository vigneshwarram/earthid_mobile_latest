import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Screens } from "../themes/index";
import { values } from "lodash";
import { LocalImages } from "../constants/imageUrlConstants";
import Card from "../components/Card";
import { ABOUT_ROUTES } from "../constants/DrawerRoute";

const CustomDrawer = (props: any) => {
  const aboutList = values(ABOUT_ROUTES).map(
    ({
      CARD: card,
      TITLE: title,
      SCREEN: route,
      URI: uri,
      RIGHT_ICON: rightUri,
    }: any) => ({
      card,
      title,
      route,
      uri,
      rightUri,
    })
  );
  const _renderItem = ({ item, index }: { item: any; index: number }) => (
    <Card
      title={item.title}
      leftIconSrc={item.uri}
      rightIconSrc={index === 0 && item.rightUri}
      style={styles.cardContainer}
    />
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
    paddingVertical: 9,
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    height: 120,
    backgroundColor: Screens.colors.customDrawer.headerBackground,
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
  },
  closeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomDrawer;
