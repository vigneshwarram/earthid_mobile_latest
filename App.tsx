/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
//@ts-ignore
import LanguageContextProvider from "./src/components/LanguageContext/LanguageContextProvider";
import RootNavigator from "./src/navigations/RootNavigator";
import { persistor, store } from "./src/redux/store";
import { Buffer } from "buffer";
import { isEarthId } from "./src/utils/PlatFormUtils";
import { Screen } from "react-native-screens";
import { Screens } from "./src/themes";
import codePush from "react-native-code-push";
global.Buffer = Buffer;

const App = () => {
  return (
    <Provider store={store} children={undefined}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <LanguageContextProvider>
            <RootNavigator />
          </LanguageContextProvider>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isEarthId()
      ? Screens.colors.ScanButton.startColor
      : "rgba(191, 208, 224, 0.3)",
  },
});

export default codePush(App);
