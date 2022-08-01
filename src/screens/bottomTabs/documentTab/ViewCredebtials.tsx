import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useAppSelector } from "../../../hooks/hooks";

const ViewCredential = () => {
  let documentsDetailsList = useAppSelector((state) => state.Documents);
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{ height: 160 }}
        showsVerticalScrollIndicator={false}
      >
        <Text>{documentsDetailsList?.responseData[0]?.vc}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
});

export default ViewCredential;
