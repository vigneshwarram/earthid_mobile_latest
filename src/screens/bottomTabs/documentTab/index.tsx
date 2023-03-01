import { useIsFocused } from "@react-navigation/native";
import { values } from "lodash";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Alert,
  Button,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Share from "react-native-share";
import Avatar from "../../../components/Avatar";
import BottomSheet from "../../../components/Bottomsheet";
import Card from "../../../components/Card";
import Header from "../../../components/Header";
import GenericText from "../../../components/Text";
import TextInput from "../../../components/TextInput";
import { LocalImages } from "../../../constants/imageUrlConstants";
import { SCREENS } from "../../../constants/Labels";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { saveDocuments } from "../../../redux/actions/authenticationAction";
import { Screens } from "../../../themes";
import { getColor } from "../../../utils/CommonFuntion";

interface IDocumentScreenProps {
  navigation?: any;
  route?: any;
}

const DocumentScreen = ({ navigation, route }: IDocumentScreenProps) => {
  const _toggleDrawer = () => {
    navigation.openDrawer();
  };
  const isFoused = useIsFocused();
  let documentsDetailsListData = useAppSelector((state) => state.Documents);
  const [documentsDetailsList, setdocumentsDetailsList] = useState(
    documentsDetailsListData
  );
  const [selectedDocuments, setselectedDocuments] = useState();

  let categoryTypes = "";

  if (route?.params && route?.params?.category) {
    categoryTypes = route?.params?.category;
  }
  const dispatch = useAppDispatch();
  const [selectedItem, setselectedItem] = useState();
  const [edit, setEdit] = useState();
  const [multiSelectionEnabled, setMultiSelectionEnabled] = useState(false);
  const [clearMultiselection, setClearMultiSelection] = useState(false);
  const [
    isBottomSheetForSideOptionVisible,
    setisBottomSheetForSideOptionVisible,
  ] = useState<boolean>(false);
  const [multpleDocuments, setMultipleDucuments] = useState({
    isSelected: false,
  });
  const [searchedData, setSearchedData] = useState([]);

  const [searchText, setsearchText] = useState("");
  const [isCheckBoxEnable, setCheckBoxEnable] = useState(false);
  const [isClear, setIsClear] = useState(false);
  // useEffect(() => {
  //   console.log("DOCUMENTS=====>>>>>>>>>>>", route?.params?.category);
  //   const chek = route?.params?.category;
  //   chek === undefined ? console.log("All posts") : console.log("filtrd");
  // }, [route?.params?.category]);

  const [isBottomSheetForFilterVisible, setisBottomSheetForFilterVisible] =
    useState<boolean>(false);
  const [isBottomSheetForShare, setIsBottomSheetForShare] =
    useState<boolean>(false);
  const _rightIconOnPress = (selecteArrayItem: any) => {
    console.log(",,,,selecteArrayItem", selecteArrayItem);
    setselectedDocuments(selecteArrayItem);
    setselectedItem(selecteArrayItem);
    setisBottomSheetForSideOptionVisible(true);
  };
  const _shareIconPress = (selecteArrayItem: any) => {
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
  console.log('colors',getItems)
  if(getItems[0]==undefined){
    return '#D7EFFB'
  }
    return getItems[0];
  };
  const getImagesColor = (item: any) => {
    let colors = item?.name;
    let iteName = colors?.trim()?.split("(")[0]?.trim();
    console.log('iteName==>',iteName)
    return getColor(iteName);
  };
  useEffect(() => {
    if (documentsDetailsListData) {
      setdocumentsDetailsList(documentsDetailsListData);
    }
  }, [documentsDetailsListData]);

  const multiSelect = (item) => {
    // console.log(item?.base64, "@@@@@@@@@");
    // setMultipleDucuments(item);
    setCheckBoxEnable(!isCheckBoxEnable);
  };
  const _selectTigger = (item: any) => {
    item.isSelected = !item.isSelected;
    setselectedDocuments(item);
    setdocumentsDetailsList({ ...documentsDetailsList });
  };

  const _renderItem = ({ item, index }: any) => {
    AsyncStorage.setItem("day", item.date);
    setEdit(item)
  
    return (
      <TouchableOpacity
        onLongPress={() =>{
           multiSelect(item)
          
          }
        }
        style={{
          marginBottom: 20,
        }}
        onPress={
          isCheckBoxEnable
            ? () => _selectTigger(item)
            : () =>
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
            rightIconSrc={LocalImages.menuImage}
            rightIconOnPress={() => _rightIconOnPress(item) }
            title={item.name}
            subtitle={
              item.isVc
                ? `      Received  : ${item.date}`
                : `      Uploaded  : ${item.date}`
            }
            isCheckBoxEnable={isCheckBoxEnable}
            onCheckBoxValueChange={(value: any) => {
              // item.isSelected = value;
              //setdocumentsDetailsList({ ...documentsDetailsList });
            }}
            checkBoxValue={item.isSelected}
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
  const RowOption = ({ icon, title, rowAction }: any) => (
    <TouchableOpacity onPress={rowAction}>
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
          <GenericText
            style={[
              styles.categoryHeaderText,
              { fontSize: 13, marginHorizontal: 10, marginVertical: 15 },
            ]}
          >
            {title}
          </GenericText>
        </View>
      </View>
    </TouchableOpacity>
  );

  const onChangeHandler = (text: any) => {
    const newData = documentsDetailsList?.responseData.filter(function (item: {
      name: string;
    }) {
      const itemData = item.name ? item?.name.toUpperCase() : "".toUpperCase();

      const textData = text?.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setsearchText(text);

    setSearchedData(newData);
  };

  const shareItem = async () => {
    if (selectedDocuments?.isVc) {
      await Share.open({
        message: selectedItem?.vc,
        title: "Token",
      });
    } else {
      console.log("selectedItem?.base64===>", selectedItem?.base64);
      if (selectedItem?.docType === "jpg") {
        await Share.open({
          url: selectedItem?.base64,
        });
      } else {
        await Share.open({
          url: `data:image/jpeg;base64,${selectedItem?.base64}`,
        });
      }
    }
  };

  const shareMultipleItem = async () => {
    let temp = [];
    temp = documentsDetailsList?.responseData.filter((el) => {
      // console.log(i[0].isSelected,'IIII')
      return el.isSelected == true;
    });
    console.log(temp, "IIII");
    let ShareBase64Array: string[] = [];
    temp.map(async (item: any, index: number) => {
      if (item?.docType === "jpg") {
        ShareBase64Array.push(`data:image/jpg;base64,${item?.base64}`);
      } else {
        ShareBase64Array.push(`data:application/pdf;base64,${item?.base64}`);
      }
    });
    setTimeout(async () => {
      await Share.open({
        urls: ShareBase64Array,
      });
    }, 1000);
  };

  const deleteItem = () => {
    Alert.alert(
      "Confirmation! ",
      "Are you sure you want to delete this document ?",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed!") },
        {
          text: "OK",
          onPress: () => {
            setisBottomSheetForSideOptionVisible(false);

            const newData = documentsDetailsList?.responseData.filter(
              function (item: { name: any }) {
                return item.name !== selectedItem?.name;
              }
            );

            dispatch(saveDocuments(newData));
          },
        },
      ],
      { cancelable: false }
    );
  };


function editItem(){
 
   navigation.navigate("categoryScreen", { selectedItem: selectedItem , editDoc : "editDoc", itemData:edit})
  // var data : any =selectedItem
  // await AsyncStorage.setItem("userDetails", data);
  // await AsyncStorage.setItem("editDoc", "editDoc");

  console.log('iteName==>',selectedItem)
}


  const onPressNavigateTo = () => {
    navigation.navigate("uploadDocumentsScreen");
  };
  const _keyExtractor = ({ path }: any) => path.toString();

  const getFilteredData = () => {
    let data = documentsDetailsList?.responseData;

    if (categoryTypes !== "") {
      var alter = function (item: any) {
        let splittedValue = item?.categoryType
          ?.trim()
          .split("(")[0]
          ?.toLowerCase();

        return splittedValue?.trim() === categoryTypes?.trim()?.toLowerCase(); //use the argument here.
      };
      var filter = documentsDetailsList?.responseData?.filter(alter);
      return filter;
    }

    if (searchedData.length > 0) {
      data = searchedData;
      return data;
    }

    if (searchedData.length === 0 && searchText != "") {
      return [];
    }
    console.log("searchedData====>{{}}}}}", data);
    return data;
  };
  const clearData = () => {};

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
            rightIconPress={onPressNavigateTo}
            leftIconSource={LocalImages.logoImage}
            rightIconSource={LocalImages.addImage}
            onpress={() => {
              _toggleDrawer();
            }}
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
            value={searchText}
            onChangeText={onChangeHandler}
          />
          {isCheckBoxEnable && (
            <View
              style={{ alignItems: "flex-end", marginTop: 20, marginRight: 25 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // width: "20%",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => shareMultipleItem()}>
                  <Image
                    source={LocalImages.shareImage}
                    style={{
                      height: 18,
                      width: 18,
                      marginRight: 15,
                      tintColor: "#293fee",
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setCheckBoxEnable(false);
                    setIsClear(true);
                  }}
                >
                  <Text style={{ color: "tomato", fontWeight: "500" }}>
                    CLEAR
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <FlatList<any>
            data={getFilteredData()}
            renderItem={_renderItem}
            keyExtractor={_keyExtractor}
          />

          <BottomSheet
            onClose={() => setisBottomSheetForSideOptionVisible(false)}
            height={200}
            isVisible={isBottomSheetForSideOptionVisible}
          >
            <View style={{ height: 150, width: "100%", paddingHorizontal: 30 }}>
            <RowOption
                rowAction={() => editItem()}
                title={"edit"}
                icon={LocalImages.editIcon}
              />
              <RowOption
                rowAction={() => shareItem()}
                title={"share"}
                icon={LocalImages.shareImage}
              />
              <RowOption
                rowAction={() => deleteItem()}
                title={"delete"}
                icon={LocalImages.deleteImage}
              />
              
            </View>
          </BottomSheet>
          <BottomSheet
            onClose={() => setIsBottomSheetForShare(false)}
            height={150}
            isVisible={isBottomSheetForShare}
          >
            <View style={{ height: 50, width: "100%", paddingHorizontal: 30 }}>
              <RowOption
                rowAction={() => shareItem()}
                title={"Share"}
                icon={LocalImages.shareImage}
              />
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
    borderRadius: 13,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: Screens.pureWhite,
    // backgroundColor:'red',
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
    tintColor:"black"
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
