import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import SuccessPopUp from "../../../components/Loader";
import AnimatedLoader from "../../../components/Loader/AnimatedLoader";
import { LocalImages } from "../../../constants/imageUrlConstants";
import { useFetch } from "../../../hooks/use-fetch";
import { Screens } from "../../../themes/index";
import Pdf from "react-native-pdf";

const DocumentPreviewScreen = (props: any) => {
  const { fileUri, type } = props.route.params;
  const { documentDetails } = props.route.params;
  console.log("documentDetails", documentDetails);

  const { loading, data, error, fetch: postFormfetch } = useFetch();
  const [successResponse, setsuccessResponse] = useState(false);
  const [message, Setmessage] = useState("ooo");
  const [datas, SetData] = useState(null);
  const [source, setSource] = useState({});
  const [filePath, setFilePath] = useState();

  return (
    <View style={styles.sectionContainer}>
      <View style={{ position: "absolute", top: 20, right: 20, zIndex: 100 }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            resizeMode="contain"
            style={[styles.logoContainer]}
            source={LocalImages.closeImage}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.8, paddingHorizontal: 10, marginLeft: 20 }}>
        <Pdf
          source={{ uri: documentDetails.base64 }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
        {/* {documentDetails.base64 ? (
          <Image
            resizeMode={"contain"}
            style={{
              width: 330,
              height: "100%",
            }}
            source={{ uri: documentDetails.base64 }}
          ></Image>
        ) : (
          <GenericText style={{ color: "#fff", marginVertical: 50 }}>
            {JSON.stringify(documentDetails)}
          </GenericText>
        )} */}
      </View>

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
});

export default DocumentPreviewScreen;
