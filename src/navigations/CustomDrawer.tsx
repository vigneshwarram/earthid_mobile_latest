import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  Alert,
  Linking,
} from "react-native";
import { Screens } from "../themes/index";
import { values } from "lodash";
import { LocalImages } from "../constants/imageUrlConstants";
import Card from "../components/Card";
import { ABOUT_ROUTES } from "../constants/Routes";
import { StackActions } from "@react-navigation/native";
import GenericText from "../components/Text";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { FlushData } from "../redux/actions/authenticationAction";
import { useFetch } from "../hooks/use-fetch";
import { deleteUserApi } from "../utils/earthid_account";
import { EARTHID_DEV_BASE } from "../constants/URLContstants";

const CustomDrawer = (props: any) => {
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.account);
  const {
    loading,
    data: deletedRespopnse,
    error,
    fetch: deleteFetch,
  } = useFetch();

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
      dispatch(FlushData()).then(() => {
        props.navigation.dispatch(StackActions.replace("AuthStack"));
      });
    } else if (item.route === "delete") {
      deleteUser();
    } else if (item.route === "about" || item.route === "terms") {
      Linking.openURL("https://www.myearth.id");
    } else {
      props.navigation.navigate(item.route);
    }
  };

  const deleteuserData = () => {
    const paramsUrl = `${EARTHID_DEV_BASE}/user/deleteUser?earthId=${userDetails?.responseData?.earthId}&publicKey=${userDetails?.responseData?.publicKey}`;
    console.log("paramsUrl", paramsUrl);
    const requestBoady = {
      publicKey: userDetails?.responseData?.publicKey,
    };
    deleteFetch(paramsUrl, requestBoady, "DELETE");
  };

  useEffect(() => {
    if (deletedRespopnse) {
      dispatch(FlushData()).then(() => {
        props.navigation.dispatch(StackActions.replace("AuthStack"));
      });
    }
  }, [deletedRespopnse]);

  const deleteUser = () => {
    Alert.alert(
      "Delete Identity?",
      "Are you sure you want to delete your GlobalId? Once deleted you won't be able to recover it later.",
      [
        {
          text: "Yes",
          onPress: async () => {
            deleteuserData();
          },
          style: "cancel",
        },
        {
          text: "No",
          onPress: async () => {},
        },
      ],
      { cancelable: false }
    );
  };

  const _signOutAsync = () => {
    Alert.alert(
      "Delete Identity?",
      "Are you sure you want to delete your EarthId? Once deleted you won't be able to recover it later.",
      [
        {
          text: "Yes",
          onPress: async () => {
            // dispatch(FlushData()).then(() => {
            //   props.navigation.dispatch(StackActions.replace("AuthStack"));
            // });
            deleteuserData();
          },
          style: "cancel",
        },
        {
          text: "No",
          onPress: async () => {},
        },
      ],
      { cancelable: false }
    );
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
            <GenericText
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
            </GenericText>
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
          onPress={() => props.navigation.closeDrawer()}
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
