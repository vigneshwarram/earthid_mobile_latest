import { values } from "lodash";
import React from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";

import Card from "../../../components/Card";
import Header from "../../../components/Header";
import { LocalImages } from "../../../constants/imageUrlConstants";
import { SCREENS } from "../../../constants/Labels";
import { Screens } from "../../../themes";

interface IDocumentScreenProps {
  navigation?: any;
}

const DocumentScreen = ({ navigation }: IDocumentScreenProps) => {
  const _toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const documentsDetailsList = values(
    SCREENS.HOMESCREEN.documentsDetailsList
  ).map(
    ({
      TITLE: title,
      URI: uri,
      COLOR: color,
      SUBTITLE: subtitle,
      ID: id,
    }: any) => ({
      title,
      uri,
      color,
      subtitle,
      id,
    })
  );

  const _renderItem = ({ item }: any) => {
    return (
      <Card
        titleIcon={LocalImages.vcImage}
        leftAvatar={item.uri}
        title={item.title}
        subtitle={item.subtitle}
        style={{
          ...styles.cardContainer,
          ...{
            avatarContainer: {
              backgroundColor: item.color,
              width: 60,
              height: 60,
              borderRadius: 20,
              marginTop: 25,
            },
          },
        }}
      />
    );
  };

  const _keyExtractor = ({ id }: any) => id.toString();
  return (
    <View style={styles.sectionContainer}>
      <Header
        leftIconSource={LocalImages.logoImage}
        onpress={_toggleDrawer}
        linearStyle={styles.linearStyle}
      ></Header>
      <Text style={[styles.categoryHeaderText, { fontSize: 13 }]}>
        {SCREENS.HOMESCREEN.History}
      </Text>
      <FlatList<any>
        showsHorizontalScrollIndicator={false}
        data={documentsDetailsList}
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
  linearStyle: {
    height: 120,
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
  alignCenter: { justifyContent: "center", alignItems: "center" },
  label: {
    fontWeight: "bold",
    color: Screens.black,
  },
  textInputContainer: {
    backgroundColor: "#fff",
    elevation: 1,
    borderColor: "transparent",
  },
  categoryHeaderText: {
    marginHorizontal: 30,
    marginVertical: 10,
    color: Screens.headingtextColor,
  },

  cardContainer: {
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
  documentContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
    flex: 1,
    backgroundColor: Screens.pureWhite,
  },
  logoContainer: {
    width: 25,
    height: 25,
  },
});

export default DocumentScreen;
