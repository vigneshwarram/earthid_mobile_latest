import { values } from "lodash";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import Avatar from "../../../components/Avatar";
import BottomSheet from "../../../components/Bottomsheet";
import Card from "../../../components/Card";
import Header from "../../../components/Header";
import TextInput from "../../../components/TextInput";
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

  const [
    isBottomSheetForSideOptionVisible,
    setisBottomSheetForSideOptionVisible,
  ] = useState<boolean>(false);

  const [isBottomSheetForFilterVisible, setisBottomSheetForFilterVisible] =
    useState<boolean>(false);

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

  const _rightIconOnPress = () => {
    setisBottomSheetForSideOptionVisible(true);
  };

  const _renderItem = ({ item }: any) => {
    return (
      <Card
        absoluteCircleInnerImage={LocalImages.upImage}
        rightIconOnPress={_rightIconOnPress}
        titleIcon={LocalImages.vcImage}
        rightIconSrc={LocalImages.menuImage}
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
            uploadImageStyle: {
              backgroundColor: item.color,
            },
          },
        }}
      />
    );
  };
  const RowOption = ({ icon, title }: any) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {icon && (
        <Image
          resizeMode="contain"
          style={styles.logoContainer}
          source={icon}
        ></Image>
      )}

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={[
            styles.categoryHeaderText,
            { fontSize: 13, marginHorizontal: 10, marginVertical: 15 },
          ]}
        >
          {title}
        </Text>
      </View>
    </View>
  );

  const onChangeHandler = () => {};
  const _keyExtractor = ({ id }: any) => id.toString();
  return (
    <View style={styles.sectionContainer}>
      <Header
        leftIconSource={LocalImages.logoImage}
        rightIconSource={LocalImages.addImage}
        onpress={_toggleDrawer}
        linearStyle={styles.linearStyle}
      ></Header>
      <TextInput
        leftIcon={LocalImages.searchImage}
        style={{
          container: styles.textInputContainer,
        }}
        isError={false}
        isNumeric={false}
        placeholder={"Search documents"}
        value={""}
        onChangeText={onChangeHandler}
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.categoryHeaderText, { fontSize: 13 }]}>
          {SCREENS.HOMESCREEN.upload}
        </Text>
        <Text
          style={[
            styles.categoryHeaderText,
            { fontSize: 13, color: Screens.colors.primary },
          ]}
        >
          {`press & hold`}
        </Text>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => setisBottomSheetForFilterVisible(true)}
        >
          <View>
            <Image
              resizeMode="contain"
              style={styles.logoContainer}
              source={LocalImages.filter}
            ></Image>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList<any>
        showsHorizontalScrollIndicator={false}
        data={documentsDetailsList}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
      />
      <BottomSheet
        onClose={() => setisBottomSheetForSideOptionVisible(false)}
        height={150}
        isVisible={isBottomSheetForSideOptionVisible}
      >
        <View style={{ height: 100, width: "100%", paddingHorizontal: 30 }}>
          <RowOption title={"Share"} icon={LocalImages.shareImage} />
          <RowOption title={"Delete"} icon={LocalImages.deleteImage} />
        </View>
      </BottomSheet>
      <BottomSheet
        onClose={() => setisBottomSheetForFilterVisible(false)}
        height={150}
        isVisible={isBottomSheetForFilterVisible}
      >
        <View style={{ height: 150, width: "100%", paddingHorizontal: 30 }}>
          <RowOption title={"By Category"} />
          <RowOption title={"By Date"} />
          <RowOption title={"By Frequency"} />
        </View>
      </BottomSheet>
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
    marginVertical: 20,
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
