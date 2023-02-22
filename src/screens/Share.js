import React, { useState, useEffect, useCallback } from "react";
import { AppRegistry, Text, View, Image, TouchableOpacity } from "react-native";
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
const Share = () => {
  const [sharedData, setSharedData] = useState("");
  const [sharedMimeType, setSharedMimeType] = useState("");

  useEffect(() => {
    ShareMenuReactView.data().then(async ({ mimeType, data }) => {
      console.log("data[0]?.data", data[0]?.mimeType);
      setSharedData(data[0]?.data);
      setSharedMimeType(data[0]?.mimeType);
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: 400, height: 600, resizeMode: "contain" }}
          source={{ uri: sharedData }}
        />
      </View>
      {sharedData !== "" && (
        <TouchableOpacity
          onPress={() => {
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
