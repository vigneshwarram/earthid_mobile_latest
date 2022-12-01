import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";

import Button from "../../components/Button";

import Card from "../../components/Card";
import Header from "../../components/Header";
import AnimatedLoader from "../../components/Loader/AnimatedLoader";
import ModalView from "../../components/Modal";
import GenericText from "../../components/Text";
import { LocalImages } from "../../constants/imageUrlConstants";
import { SCREENS } from "../../constants/Labels";
import { useFetch } from "../../hooks/use-fetch";
import { Screens } from "../../themes";
import { alertBox, getCategoriesApi } from "../../utils/earthid_account";
import { isEarthId } from "../../utils/PlatFormUtils";
const deviceWidth = Dimensions.get("window").width;
interface IDocumentScreenProps {
  navigation?: any;
  route?: any;
}

const categoryScreen = ({ navigation, route }: IDocumentScreenProps) => {
  const { fileUri } = route.params;
  const [isPrceedForLivenessTest, setIsPrceedForLivenessTest] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedDocument, setselectedDocument] = useState();
  const [selectedParentIndex, setSelectedParentIndex] = useState(0);
  const {
    loading: isCategoryLoading,
    data: getCategoryData,
    error,
    fetch: getCategories,
  } = useFetch();
  const _toggleDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    getCategories(getCategoriesApi, {}, "GET");
  }, []);
  useEffect(() => {
    if (getCategoryData) {
      var localCategories: any = [];

      Object.keys(getCategoryData).map((itemKey, indexOfKey) => {
        var InternalArray: { title: any }[] = [];
        getCategoryData[itemKey].map((item: any) => {
          InternalArray.push({ title: item });
        });

        localCategories.push({
          key: itemKey,
          value: InternalArray,
          color: SCREENS.CATEGORYSCREEN.categories[indexOfKey]?.color,
          isSelected: false,
        });
      });
      console.log('==>localCategories',localCategories)
      setCategoryList(localCategories);
    }
  }, [getCategoryData]);

  const selectCategory = (selectedItem: string, selectedIndex: number) => {
    var localCategories = [];
    setSelectedParentIndex(selectedIndex);
    localCategories = categoryList.map((item: any, index: number) => {
      if (index === selectedIndex) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
      return item;
    });
    console.log("localCategories", localCategories);
    setCategoryList([...localCategories]);
    //
  };

  const selectCategoryChildren = (
    selectedItem: string,
    selectedIndex: number
  ) => {
    var localCategories = [];
    localCategories = categoryList.map((item: any, index: number) => {
      item.value.map((itemChildren: any, childrenIndex: number) => {
        if (childrenIndex === selectedIndex && index === selectedParentIndex) {
          console.log("item selected children====>", itemChildren.title);
          setselectedDocument(itemChildren.title);
          itemChildren.isSelected = true;
        } else {
          itemChildren.isSelected = false;
        }
        return itemChildren;
      });
      return item;
    });

    setCategoryList([...localCategories]);
   // setIsPrceedForLivenessTest(true);
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity onPress={() => selectCategory(item, index)}>
        <View
          style={[
            styles.cardContainer,
            {
              backgroundColor: item.isSelected
                ? "rgba(184, 191, 241, 1)"
                : Screens.pureWhite,
            },
          ]}
        >
          <View style={{ flexDirection: "row" ,}}>
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: item.isSelected ? "green" : item.color,
                alignSelf: "center",
                marginHorizontal: 10,
                borderRadius:2
              }}
            >
              {item.isSelected && <Image
                 style={{tintColor:'#fff',width:8,height:10, alignSelf: "center",}}
                 source={LocalImages.tikImage}
              ></Image> }
              
              {item?.isSelected && <View></View>}
            </View>
            <Text style={{ fontWeight: "bold" }}>{item.key}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderItemDocuments = ({ item, index }: any) => {
    console.log("values",item)
    return (
      <TouchableOpacity onPress={() => selectCategoryChildren(item, index)}>
        <View style={styles.documentContainer}>
          <Card
            rightIconSrc={item?.isSelected && LocalImages.successTikImage}
            leftIconSrc={LocalImages.documentsImage}
            title={item?.title == 'DL'?'Driving License':item?.title}
            style={[
              styles.cardContainer1,
              {
                backgroundColor: item?.isSelected
                  ? "rgba(184, 191, 241, 1)"
                  : Screens.pureWhite,
              },
            ]}
          />
        </View>
            
      </TouchableOpacity>
    );
  };

  useEffect(()=>{
console.log("selctCategorys==>",categoryList)

  },[])

  return (
    <View style={styles.sectionContainer}>
      <ScrollView contentContainerStyle={{ flex: 1}}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.3}}>
            <Header
              leftIconSource={LocalImages.backImage}
              onpress={() => {
                _toggleDrawer();
              }}
              headingText={"Choose Category"}
              linearStyle={styles.linearStyle}
              containerStyle={{
                iconStyle: {
                  width: 15,
                  height: 15,
                },
              }}
            ></Header>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                position: "absolute",
                marginTop: 40,
                marginLeft: 20,
              }}
            >
              <Image
                source={LocalImages.backImage}
                style={{ height: 20, width: 20, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <View>
              <FlatList<any>
                numColumns={3}
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                data={categoryList}
                renderItem={_renderItem}
              />
            </View>
          </View>
          <View style={{ flex: 0.75}}>
            
            {categoryList.map((item: any, index: number) => {
              if (item.isSelected) {
                return (
                  <ScrollView>
                    {
              categoryList.length !== 0 ?
              (<GenericText
                style={[
                  styles.categoryHeaderText,
                  { fontSize: 14, fontWeight: "700" },
                ]}
              >
                {"selectDoc"}
              </GenericText>) 
              :
             <></>
            }
                    <FlatList<any>
                      nestedScrollEnabled
                      scrollEnabled={true}
                      data={item?.value}
                      renderItem={_renderItemDocuments}
                    />
                    <View style={{backgroundColor: Screens.pureWhite}}>
                      <Button
                       onPress={()=>setIsPrceedForLivenessTest(true)}
                       style={{
                        buttonContainer: {
                          elevation: 5,
                          marginLeft:15,
                          marginRight:15,
                        },
                        text: {
                          color: Screens.pureWhite,
                        },
                        iconStyle: {
                          tintColor: Screens.pureWhite,
                        },
                      }}
                      title={"submitt"}
                      />
                    </View>
                      
                  </ScrollView>
                );
              }
            })}
           
          </View>
        </View>
        <ModalView height={250} isModalVisible={isPrceedForLivenessTest}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 5,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isEarthId()
                  ? Screens.colors.ScanButton.startColor
                  : "#fff",
                width: deviceWidth / 1.5,
              }}
            >
              <Image
                resizeMode="contain"
                style={[styles.logoContainer]}
                source={LocalImages.logoImage}
              ></Image>
            </View>

            <Button
              onPress={() => {
                setIsPrceedForLivenessTest(false);
                setTimeout(() => {
                  navigation.navigate("LivenessCameraScreen", {
                    fileUri,
                    selectedDocument,
                  });
                }, 100);
              }}
              style={{
                buttonContainer: {
                  elevation: 5,
                  marginHorizontal: 10,
                },
                text: {
                  color: Screens.pureWhite,
                  fontSize: 12,
                },
                iconStyle: {
                  tintColor: Screens.pureWhite,
                },
              }}
              title={"PROCEED FOR LIVENESS TEST"}
            ></Button>
          </View>
        </ModalView>
        <AnimatedLoader
          isLoaderVisible={isCategoryLoading}
          loadingText="Loading..."
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
    height: 80,
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
    marginHorizontal: 10,
    marginVertical: 5,
    color: "#000",
  },

  cardContainer: {
    padding: 8,
    backgroundColor: Screens.pureWhite,
    borderColor: Screens.grayShadeColor,
    justifyContent: "space-between",
    margin: 10,
    borderRadius: 8,

    borderWidth: 1,
  },
  cardContainer1: {
    padding: 3,
    backgroundColor: Screens.pureWhite,
    borderColor: Screens.grayShadeColor,

    margin: 5,
    borderRadius: 8,

    borderWidth: 1,
  },
  documentContainer: {
    marginHorizontal: 5,

    padding: 8,
    backgroundColor: Screens.pureWhite,
  },
  logoContainer: {
    width: 130,
    height: 130,
  },
});

export default categoryScreen;
