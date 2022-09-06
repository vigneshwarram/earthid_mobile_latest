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
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
//@ts-ignore
import i18n from "./src/utils/i18n"; //DO NOT REMOVE - this needs to be present here or in index.js
import LanguageContextProvider from "./src/components/LanguageContext/LanguageContextProvider";
import RootNavigator from "./src/navigations/RootNavigator";
import { persistor, store } from "./src/redux/store";
import { Buffer } from "buffer";
global.Buffer = Buffer;

const App = () => {
  return (
    <Provider store={store}>
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
    backgroundColor: "rgba(191, 208, 224, 0.3)",
  },
});

export default App;
