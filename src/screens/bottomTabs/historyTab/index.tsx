import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { json } from "stream/consumers";

import Card from "../../../components/Card";
import Header from "../../../components/Header";
import AnimatedLoader from "../../../components/Loader/AnimatedLoader";
import GenericText from "../../../components/Text";
import { LocalImages } from "../../../constants/imageUrlConstants";
import { SCREENS } from "../../../constants/Labels";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getHistory } from "../../../redux/actions/authenticationAction";
import { Screens } from "../../../themes";
import Avatar from "../../../components/Avatar";
import { getColor } from "../../../utils/CommonFuntion";

interface IDocumentScreenProps {
  navigation?: any;
}

const DocumentScreen = ({ navigation }: IDocumentScreenProps) => {
  const getHistoryReducer = useAppSelector((state) => state.getHistoryReducer);
  const userDetails = useAppSelector((state) => state.account);
  const [selectedItem, setselectedItem] = useState();

  const [
    isBottomSheetForSideOptionVisible,
    setisBottomSheetForSideOptionVisible,
  ] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  let documentsDetailsList = useAppSelector((state) => state.Documents);
  let data = documentsDetailsList?.responseData;

  const _toggleDrawer = () => {
    navigation.openDrawer();
  };
  if (getHistoryReducer?.isSuccess) {
    getHistoryReducer.isSuccess = false;
  }

  console.log("----+++,", data);

  //open document
  const _rightIconOnPress = (selecteArrayItem: any) => {
    console.log(",,,,selecteArrayItem", selecteArrayItem);
    setselectedItem(selecteArrayItem);
    setisBottomSheetForSideOptionVisible(true);
  };

  const getCategoryImages = (item: { categoryType: any; name: any }) => {
    const getItems = SCREENS.HOMESCREEN.categoryList.filter(
      (itemFiltered, index) => {
        return (
          itemFiltered.TITLE.toLowerCase() === item?.categoryType?.toLowerCase()
        );
      }
    );

    return getItems[0];
  };
  const getImagesColor = (item: any) => {
    let colors = item?.name;
    let iteName = colors.trim()?.split("(")[0]?.trim();
    return getColor(iteName);
  };
  const _renderItem = ({ item }: any) => {
    return (
      // <Card
      //   leftAvatar={LocalImages.documentsImage}
      //   absoluteCircleInnerImage={LocalImages.upImage}
      //   //  rightIconSrc={LocalImages.menuImage}
      //   title={item.name}
      //   subtitle={`      Uploaded  : ${item.date}`}
      //   style={{
      //     ...styles.cardContainer,
      //     ...{
      //       avatarContainer: {
      //         backgroundColor: "rgba(245, 188, 232, 1)",
      //         width: 62,
      //         height: 62,
      //         borderRadius: 20,
      //         marginTop: 25,
      //         marginLeft: 10,
      //         marginRight: 5,
      //       },
      //       uploadImageStyle: {
      //         backgroundColor: "rgba(245, 188, 232, 1)",
      //         borderRadius: 25,
      //         borderWidth: 3,
      //         bordercolor: "#fff",
      //         borderWidthRadius: 25,
      //       },
      //     },
      //     title: {
      //       fontSize: 18,
      //       marginTop: -10,
      //       fontWeight: "bold",
      //     },
      //     subtitle: {
      //       fontSize: 14,
      //       marginTop: 5,
      //     },
      //   }}
      // />
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() =>
          navigation.navigate("ViewCredential", { documentDetails: item })
        }
      >
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Avatar
              isCategory={true}
              isUploaded={false}
              iconSource={getCategoryImages(item)?.URI}
              style={{
                container: [
                  styles.avatarContainer,
                  {
                    backgroundColor: getCategoryImages(item)?.COLOR,
                    flexDirection: "row",
                  },
                ],
                imgContainer: styles.avatarImageContainer,
                text: styles.avatarTextContainer,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: -20,
            }}
          >
            <GenericText
              style={[
                { fontSize: 15, fontWeight: "bold", marginHorizontal: 9 },
              ]}
            >
              {item?.categoryType}
            </GenericText>
          </View>
        </View>

        <View style={{ marginTop: -20 }}>
          <Card
            titleIcon={item?.isVc ? LocalImages.vcImage : null}
            leftAvatar={LocalImages.documentsImage}
            absoluteCircleInnerImage={LocalImages.upImage}
            // rightIconSrc={LocalImages.menuImage}
            rightIconOnPress={() => _rightIconOnPress(item)}
            title={item.name}
            subtitle={`      Uploaded  : ${item.date}`}
            style={{
              ...styles.cardContainer,
              ...{
                avatarContainer: {
                  backgroundColor: getImagesColor(item),
                  width: 60,
                  height: 60,
                  borderRadius: 20,
                  marginTop: 25,
                  marginLeft: 10,
                  marginRight: 5,
                },
                uploadImageStyle: {
                  backgroundColor: getImagesColor(item),
                  borderRadius: 25,
                  borderWidth: 3,
                  bordercolor: "#fff",
                  borderWidthRadius: 25,
                },
              },
              title: {
                fontSize: 18,
                marginTop: -10,
                fontWeight: "bold",
              },
              subtitle: {
                fontSize: 14,
                marginTop: 5,
              },
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const _keyExtractor = ({ id }: any) => id.toString();
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
        {getHistoryReducer?.responseData
          ? console.log("gettingResponse of HISTORY====>", getHistoryReducer)
          : null}
        <Header
          leftIconSource={LocalImages.logoImage}
          onpress={() => {
            _toggleDrawer();
          }}
          linearStyle={styles.linearStyle}
        ></Header>
        <GenericText
          style={[styles.categoryHeaderText, { fontSize: 14, marginTop: 10 }]}
        >
          {SCREENS.HOMESCREEN.History}
        </GenericText>

        <FlatList<any>
          showsHorizontalScrollIndicator={false}
          // data={
          //   getHistoryReducer && getHistoryReducer?.responseData
          //     ? getHistoryReducer.responseData
          //     : []
          // }
          data={data}
          extraData={data}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id}
        />
        <AnimatedLoader
          isLoaderVisible={getHistoryReducer?.isLoading}
          loadingText="loading"
        />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
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
  avatarContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 8,
  },
  avatarImageContainer: {
    width: 15,
    height: 15,
    marginTop: 5,
    tintColor: "#fff",
  },
  avatarTextContainer: {
    fontSize: 13,
    fontWeight: "500",
  },
});

export default DocumentScreen;
