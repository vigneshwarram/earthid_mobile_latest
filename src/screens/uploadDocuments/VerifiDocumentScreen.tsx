import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

import RNFetchBlob from "rn-fetch-blob";

import Button from "../../components/Button";
import Header from "../../components/Header";
import SuccessPopUp from "../../components/Loader";
import AnimatedLoader from "../../components/Loader/AnimatedLoader";
import { LocalImages } from "../../constants/imageUrlConstants";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useFetch } from "../../hooks/use-fetch";
import { saveDocuments } from "../../redux/actions/authenticationAction";
import { Screens } from "../../themes/index";
import {
  cryptoTransferApi,
  MD5,
  selfieeverifyAPI,
} from "../../utils/earthid_account";
import { dateTime } from "../../utils/encryption";

export interface IDocumentProps {
  name: string;
  path: string;
  date: string;
  time: string;
  txId: string;
  docType: string;
  docExt: string;
  processedDoc: string;
  vc: any;
  isVc: boolean;
}
const VerifiDocumentScreen = (props: any) => {
  const { uploadedDocuments } = props.route.params;
  const { faceImageData } = props.route.params;
  const { loading, data, error, fetch } = useFetch();
  const [load, setLoad] = useState(false);
  const dispatch = useAppDispatch();
  const [successResponse, setsuccessResponse] = useState(false);
  let documentsDetailsList = useAppSelector((state) => state.Documents);
  var base64Icon = `data:image/png;base64,${faceImageData?.base64}`;
  var uploadedDocumentsBase64 = `data:image/png;base64,${uploadedDocuments?.base64}`;

  const validateImages = () => {
    setLoad(true);
    const dataHashed = MD5(uploadedDocuments?.base64);
    const request = {
      memo: dataHashed,
      isTestnet: true,
    };
    fetch(cryptoTransferApi, request, "POST").then(() => {
      setLoad(false);
    });
  };
  useEffect(() => {
    if (data) {
      var date = dateTime();
      const filePath = RNFetchBlob.fs.dirs.DocumentDir + "/" + "Adhaar";
      var documentDetails: IDocumentProps = {
        name: "Adhaar",
        path: filePath,
        date: date?.date,
        time: date?.time,
        txId: data?.result,
        docType: "pdf",
        docExt: ".jpg",
        processedDoc: "",
      };

      var DocumentList = documentsDetailsList?.responseData
        ? documentsDetailsList?.responseData
        : [];
      DocumentList.push(documentDetails);
      dispatch(saveDocuments(DocumentList));
      setsuccessResponse(true);
      setTimeout(() => {
        setsuccessResponse(false);
        props.navigation.navigate("Document");
      }, 2000);
    }
  }, [data]);
  return (
    <View style={styles.sectionContainer}>
      <Header
        isLogoAlone={true}
        linearStyle={styles.linearStyle}
        containerStyle={{
          iconStyle: {
            width: 150,
            height: 72,
            marginTop: 0,
          },
          iconContainer: styles.alignCenter,
        }}
      ></Header>
      <View style={{ position: "absolute", top: 20, right: 20, zIndex: 100 }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            resizeMode="contain"
            style={[styles.logoContainer]}
            source={LocalImages.closeImage}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.dashedLine}>
        <Image
          resizeMode={"contain"}
          style={{
            width: 330,
            height: "100%",
          }}
          source={{ uri: uploadedDocumentsBase64 }}
        ></Image>
      </View>

      <View style={styles.dashedLine}>
        <Image
          resizeMode={"contain"}
          style={{
            width: 330,
            height: "100%",
          }}
          source={{ uri: base64Icon }}
        ></Image>
      </View>

      <View
        style={{
          flex: 0.17,
          flexDirection: "row",
          paddingHorizontal: 5,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={validateImages}
          style={{
            elevation: 5,
            margin: 20,
            width: 300,
            borderRadius: 50,
            backgroundColor: Screens.colors.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Sumbit</Text>
        </TouchableOpacity>
      </View>

      <AnimatedLoader
        isLoaderVisible={loading || load}
        loadingText="verifying..."
      />
      <SuccessPopUp
        isLoaderVisible={successResponse}
        loadingText={"Verification succeeded"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.pureWhite,
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
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
  dashedLine: {
    borderStyle: "dashed",
    borderWidth: 2,
    borderRadius: 10,
    flex: 0.4,

    marginHorizontal: 20,
    marginVertical: 20,
  },
  linearStyle: {
    height: 80,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  logoContainer: {
    width: 15,
    height: 15,
    tintColor: "#fff",
  },
  alignCenter: { justifyContent: "center", alignItems: "center" },
});

export default VerifiDocumentScreen;
