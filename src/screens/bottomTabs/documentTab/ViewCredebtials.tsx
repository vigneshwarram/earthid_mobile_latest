import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import PDFView from "react-native-view-pdf";
import SuccessPopUp from "../../../components/Loader";
import AnimatedLoader from "../../../components/Loader/AnimatedLoader";
import GenericText from "../../../components/Text";
import { LocalImages } from "../../../constants/imageUrlConstants";
import { useFetch } from "../../../hooks/use-fetch";
import { Screens } from "../../../themes/index";
import ModalView from "../../../components/Modal";
import { isEarthId } from "../../../utils/PlatFormUtils";
import Share from "react-native-share";
import BottomSheet from "../../../components/Bottomsheet";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { saveDocuments } from "../../../redux/actions/authenticationAction";

const DocumentPreviewScreen = (props: any) => {
  const dispatch = useAppDispatch();
  const { fileUri, type } = props.route.params;
  const { documentDetails } = props.route.params;
  console.log("documentDetails", documentDetails);
  let documentsDetailsList = useAppSelector((state) => state.Documents);
  const { loading, data, error, fetch: postFormfetch } = useFetch();
  const [successResponse, setsuccessResponse] = useState(false);
  const [message, Setmessage] = useState("ooo");
  const [datas, SetData] = useState(null);
  const [source, setSource] = useState({});
  const [filePath, setFilePath] = useState();
  const [
    isBottomSheetForSideOptionVisible,
    setisBottomSheetForSideOptionVisible,
  ] = useState<boolean>(false);
  const [selectedItem, setselectedItem] = useState(documentDetails);
  console.log("documentDetails?.base64", documentDetails?.base64);
  const resources = {
    file:
      Platform.OS === "ios"
        ? "documentDetails?.base64"
        : "/sdcard/Download/test-pdf.pdf",
    url: documentDetails?.base64,
    base64: documentDetails?.base64,
  };
  const resourceType = "base64";
  const shareItem = async () => {
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
  };

  function deleteAlert() {
    Alert.alert(
      "Confirmation!",
      "Are you sure to delete this document?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteItem(),
        },
      ],
      { cancelable: false }
    );
  }

  const deleteItem = () => {
    setisBottomSheetForSideOptionVisible(false);
    const newData = documentsDetailsList?.responseData.filter(function (item: {
      name: any;
    }) {
      return item.name !== selectedItem?.name;
    });

    dispatch(saveDocuments(newData));
    props.navigation.navigate("Documents");
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
            style={styles.bottomLogo}
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

  return (
    <View style={styles.sectionContainer}>
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 20,
          zIndex: 100,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ flex: 0.1, left: 20 }}
          onPress={() => props.navigation.goBack()}
        >
          <Image
            resizeMode="contain"
            style={[styles.logoContainer]}
            source={LocalImages.backImage}
          ></Image>
        </TouchableOpacity>
        <GenericText style={styles.text}>Details</GenericText>
        <TouchableOpacity
          style={{ flex: 0.1 }}
          onPress={() => setisBottomSheetForSideOptionVisible(true)}
        >
          <Image
            resizeMode="contain"
            style={[styles.logoContainer]}
            source={LocalImages.menuImage}
          ></Image>
        </TouchableOpacity>
      </View>
      <BottomSheet
        onClose={() => setisBottomSheetForSideOptionVisible(false)}
        height={150}
        isVisible={isBottomSheetForSideOptionVisible}
      >
        <View style={{ height: 100, width: "100%", paddingHorizontal: 30 }}>
          <RowOption
            rowAction={() => shareItem()}
            title={"Share"}
            icon={LocalImages.shareImage}
          />
          <RowOption
            rowAction={() => deleteAlert()}
            title={"Delete"}
            icon={LocalImages.deleteImage}
          />
        </View>
      </BottomSheet>
      {/* <View style={{ position: "absolute", top: 20, right: 20, zIndex: 100 }}>
        
        <TouchableOpacity onPress={() => props.navigation.goBack()}>   
          <Image
            resizeMode="contain"
            style={[styles.logoContainer]}
            source={LocalImages.closeImage}
          ></Image>
        </TouchableOpacity>
      </View> */}
      <View style={{ flex: 1, marginTop: 70 }}>
        {documentDetails.pdf ? (
          <PDFView
            fadeInDuration={100.0}
            style={{ flex: 1 }}
            resource={resources[resourceType]}
            resourceType={resourceType}
            onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
            onError={() => console.log("Cannot render PDF", error)}
          />
        ) : documentDetails.base64 ? (
          <Image
            resizeMode={"contain"}
            style={{
              flex: 1,
            }}
            source={{ uri: documentDetails.base64 }}
          ></Image>
        ) : (
          <GenericText style={{ color: "#fff", marginVertical: 50 }}>
            {JSON.stringify(documentDetails)}
          </GenericText>
        )}
      </View>

      {/* <Image
            resizeMode={"contain"}
            style={{
              flex: 1,
            }}
            source={{ uri: documentDetails.base64 }}
          ></Image> */}

      <GenericText style={{ color: "#fff", fontSize: 18, alignSelf: "center" }}>
        {documentDetails.name}
      </GenericText>
      <GenericText
        style={{
          color: "#fff",
          fontSize: 18,
          alignSelf: "center",
          marginTop: 5,
        }}
      >
        {`Uploaded on ${documentDetails.date} at ${documentDetails.time}`}
      </GenericText>

      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      ></View>
      <AnimatedLoader
        isLoaderVisible={loading}
        loadingText="Uploading Documents..."
      />
      <SuccessPopUp
        isLoaderVisible={successResponse}
        loadingText={"Document Validated !"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.black,
  },
  text: {
    flex: 0.8,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    color: Screens.pureWhite,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    width: 15,
    height: 15,
    tintColor: "#fff",
  },
  bottomLogo: {
    width: 25,
    height: 25,
  },
  categoryHeaderText: {
    marginHorizontal: 30,
    marginVertical: 20,
    color: Screens.headingtextColor,
  },
});

export default DocumentPreviewScreen;
