import React, { useState, useEffect, useCallback } from "react";
import { AppRegistry, Text, View, Image, TouchableOpacity } from "react-native";
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
const Share = () => {
  const [sharedData, setSharedData] = useState("");
  const [sharedMimeType, setSharedMimeType] = useState("");

  useEffect(() => {
    console.log('ist closing',ShareMenuReactView)
    ShareMenuReactView.data().then(async ({ mimeType, data }) => {
      setSharedData(data[0]?.data);
      setSharedMimeType(data[0]?.mimeType);
    });
 
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {sharedMimeType === "application/pdf" ? (
          <Image
            style={{ width: 300, height: 600, resizeMode: "contain" }}
            source={require("../../resources/images/pdf.svg.png")}
          />
        ) : (
          <Image
            style={{ width: 400, height: 600, resizeMode: "contain" }}
            source={{ uri: sharedData }}
          />
        )}
      </View>
      {sharedData !== "" && (
        <TouchableOpacity
          onPress={() => {
            setTimeout(() => {
              ShareMenuReactView.dismissExtension();
            }, 500);
            ShareMenuReactView.continueInApp({
              data: sharedData.toString(),
              mimeType: sharedMimeType,
            });
          
          }}
          style={{
            flex: 0.2,
            backgroundColor: "#007aff",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            marginHorizontal: 30,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Share</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Share;
