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
import ToggleSwitch from "toggle-switch-react-native";
import BottomSheet from "../../components/Bottomsheet";
import Card from "../../components/Card";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import { LocalImages } from "../../constants/imageUrlConstants";
import { SCREENS } from "../../constants/Labels";
import { useAppSelector } from "../../hooks/hooks";
import { Screens } from "../../themes";

interface IDocumentScreenProps {
  navigation?: any;
}

const CustomizeQr = ({ navigation }: IDocumentScreenProps) => {
  const _toggleDrawer = () => {
    navigation.toggleDrawer();
  };
  const CategoryCustomiseList = values(
    SCREENS.HOMESCREEN.CategoryCustomiseList
  ).map(({ TITLE: title, URI: uri, VALUE: value, CHECKED: checked }: any) => ({
    title,
    uri,
    value,
    checked,
  }));
  let documentsDetailsList = useAppSelector((state) => state.Documents);
  console.log("documentsDetailsList", documentsDetailsList);
  const [
    isBottomSheetForSideOptionVisible,
    setisBottomSheetForSideOptionVisible,
  ] = useState<boolean>(false);
  const [categoriCustomize, setcategoriCustomize] = useState(
    CategoryCustomiseList
  );
  const [isBottomSheetForFilterVisible, setisBottomSheetForFilterVisible] =
    useState<boolean>(false);

  const _rightIconOnPress = () => {
    setisBottomSheetForSideOptionVisible(true);
  };

  const onToggelchange = (toggle: any, item: any, itemIndex: any) => {
    categoriCustomize.map((item, index) => {
      if (index === itemIndex) {
        item.checked = !item.checked;
      }

      return item;
    });
    setcategoriCustomize([...categoriCustomize]);
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: Screens.darkGray,
          marginHorizontal: 15,
          marginVertical: 10,
          paddingVertical: 8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={[{ fontSize: 13 }]}>{item.title}</Text>
          <Text style={[{ fontSize: 15, fontWeight: "900" }]}>
            {item.value}
          </Text>
        </View>
        <View>
          <ToggleSwitch
            onToggle={(on) => onToggelchange(on, item, index)}
            isOn={item.checked}
            size={"small"}
            onColor={Screens.colors.primary}
            offColor={Screens.darkGray}
          />
        </View>
      </View>
    );
  };

  const onChangeHandler = () => {};
  const onPressNavigateTo = () => {
    navigation.navigate("uploadDocumentsScreen");
  };

  return (
    <View style={styles.sectionContainer}>
      <Header
        rightIconPress={onPressNavigateTo}
        leftIconSource={LocalImages.logoImage}
        onpress={_toggleDrawer}
        linearStyle={styles.linearStyle}
      ></Header>
      <Text style={[styles.label, { fontSize: 14, textAlign: "center" }]}>
        {
          "Please enable the information to share with other user by simply scanning Qrcode"
        }
      </Text>
      <FlatList<any>
        showsHorizontalScrollIndicator={false}
        data={categoriCustomize}
        renderItem={_renderItem}
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
    padding: 10,
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

export default CustomizeQr;
