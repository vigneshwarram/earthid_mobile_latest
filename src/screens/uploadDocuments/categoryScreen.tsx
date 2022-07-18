import { values } from "lodash";
import React from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Card from "../../components/Card";
import Header from "../../components/Header";
import { LocalImages } from "../../constants/imageUrlConstants";
import { SCREENS } from "../../constants/Labels";
import { Screens } from "../../themes";

interface IDocumentScreenProps {
  navigation?: any;
  route?: any;
}

const categoryScreen = ({ navigation, route }: IDocumentScreenProps) => {
  const { fileUri } = route.params;
  const _toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const _renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("LivenessCameraScreen", { fileUri });
        }}
      >
        <View style={styles.cardContainer}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: item.color,
                alignSelf: "center",
                marginHorizontal: 10,
              }}
            >
              {item?.isSelected && <View></View>}
            </View>
            <Text>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _keyExtractor = ({ title }: any) => title.toString();
  return (
    <View style={styles.sectionContainer}>
      <Header
        leftIconSource={LocalImages.backImage}
        onpress={_toggleDrawer}
        headingText={"Choose Category"}
        linearStyle={styles.linearStyle}
        containerStyle={{
          iconStyle: {
            width: 15,
            height: 15,
          },
        }}
      ></Header>

      <FlatList<any>
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        data={SCREENS.CATEGORYSCREEN.categories}
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
    marginHorizontal: 30,
    marginVertical: 10,
    color: Screens.headingtextColor,
  },

  cardContainer: {
    padding: 10,
    backgroundColor: Screens.pureWhite,
    borderColor: Screens.grayShadeColor,
    justifyContent: "center",
    margin: 10,
    borderRadius: 20,
    borderWidth: 1,
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

export default categoryScreen;
