/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect ,useRef,useState} from "react";
import { SafeAreaView, StyleSheet, View ,Alert,LogBox, TouchableHighlight, TouchableWithoutFeedback, PanResponder, BackHandler, Linking, AppState} from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
//@ts-ignore
import LanguageContextProvider from "./src/components/LanguageContext/LanguageContextProvider";
import RootNavigator from "./src/navigations/RootNavigator";
import VersionCheck from 'react-native-version-check';
import { persistor, store } from "./src/redux/store";
import { Buffer } from "buffer";
import { isEarthId } from "./src/utils/PlatFormUtils";
import { Screens } from "./src/themes";
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
  const appState = useRef(AppState.currentState);
  const resetIdleTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(handleIdle, 60000*10);
  };
  const handleIdle = () => {  
    EventRegister.emit("t");
  };

  useEffect(() => {
    checkUpdateNeeded()
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkUpdateNeeded();
      }

      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  const checkUpdateNeeded = async () => {
    let updateNeeded = await VersionCheck.needUpdate();
    if (updateNeeded && updateNeeded.isNeeded) {
      Alert.alert(
        'Please update',
        'you will have to update your app to the latest version to continue using.', // <- this part is optional, you can pass an empty string
        [
          {text: 'Update', onPress: () =>  {
            BackHandler.exitApp();
            Linking.openURL(updateNeeded?.storeUrl)
          }},
        ],
        {cancelable: false},
      );
    
    }
}
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


