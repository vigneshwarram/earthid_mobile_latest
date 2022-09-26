import { values } from "lodash";
import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";

import Card from "../../../components/Card";
import Header from "../../../components/Header";
import AnimatedLoader from "../../../components/Loader/AnimatedLoader";
import GenericText from "../../../components/Text";
import { LocalImages } from "../../../constants/imageUrlConstants";
import { SCREENS } from "../../../constants/Labels";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getHistory } from "../../../redux/actions/authenticationAction";
import { Screens } from "../../../themes";

interface IDocumentScreenProps {
  navigation?: any;
}

const DocumentScreen = ({ navigation }: IDocumentScreenProps) => {
  const getHistoryReducer = useAppSelector((state) => state.getHistoryReducer);
  const userDetails = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const _toggleDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    const PayLoad = {
      userId: userDetails?.responseData?.Id,
      publicKey: userDetails?.responseData?.publicKey,
    };
    console.log("PayLoad", PayLoad);
    dispatch(getHistory(PayLoad));
  }, []);

  const _renderItem = ({ item }: any) => {
    return (
      <Card
        leftAvatar={LocalImages.documentsImage}
        absoluteCircleInnerImage={LocalImages.upImage}
        rightIconSrc={LocalImages.menuImage}
        title={item?.eventValue}
        subtitle={`       Uploaded  : ${item.createdAt}`}
        style={{
          ...styles.cardContainer,
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

  const _keyExtractor = ({ id }: any) => id.toString();
  return (
    <View style={styles.sectionContainer}>
      <Header
        leftIconSource={LocalImages.logoImage}
        onpress={() => {
          _toggleDrawer();
        }}
        linearStyle={styles.linearStyle}
      ></Header>
      <GenericText style={[styles.categoryHeaderText, { fontSize: 13 }]}>
        {SCREENS.HOMESCREEN.History}
      </GenericText>

      <FlatList<any>
        showsHorizontalScrollIndicator={false}
        data={
          getHistoryReducer && getHistoryReducer?.responseData
            ? getHistoryReducer.responseData
            : []
        }
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
      />
      <AnimatedLoader
        isLoaderVisible={getHistoryReducer?.isLoading}
        loadingText="loading"
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
