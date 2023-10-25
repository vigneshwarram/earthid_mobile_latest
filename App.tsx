/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect ,useState} from "react";
import { SafeAreaView, StyleSheet, View ,Alert,LogBox, TouchableHighlight, TouchableWithoutFeedback, PanResponder} from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
//@ts-ignore
import LanguageContextProvider from "./src/components/LanguageContext/LanguageContextProvider";
import RootNavigator from "./src/navigations/RootNavigator";
import { persistor, store } from "./src/redux/store";
import { Buffer } from "buffer";
import { isEarthId } from "./src/utils/PlatFormUtils";
import { Screens } from "./src/themes";
import IdleTimer, { IdleTimeout } from "./src/navigations/IdleTimerInteration";
import { EventRegister } from "react-native-event-listeners";

LogBox.ignoreLogs(['Warning: ...']); //Hide warnings

LogBox.ignoreAllLogs();//Hide all warning notifications on front-end

global.Buffer = Buffer;
type SharedItem = {
  mimeType: string;
  data: string;
  extraData: any;
};


const App = () => {
  const [isIdle, setIsIdle] = useState(false);
  let timer: string | number | NodeJS.Timeout | undefined 
  const resetIdleTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(handleIdle, 60000*10);
  };
  const handleIdle = () => {  
    EventRegister.emit("t");
  };


  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: resetIdleTimer,
  });
  return (
 
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <View  style={{flex:1}}  {...panResponder.panHandlers}>
        <SafeAreaView style={styles.container}>
          <LanguageContextProvider>    
            <RootNavigator />
          </LanguageContextProvider>
        </SafeAreaView>
        </View>
      </PersistGate>
    </Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isEarthId()
      ? Screens.colors.ScanButton.startColor
      : "rgba(191, 208, 224, 0.3)",
  },
});

export default App;


