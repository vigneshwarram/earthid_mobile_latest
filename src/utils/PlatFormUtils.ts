import { NativeModules, Platform } from "react-native";
import GetAppName from "react-native-get-app-name";
/**
 * @description Checks if the os is andriod or not.
 */
export const isAndroid = Platform.OS === "android";

export const isEarthId = () => {
  // const outData = await getAppName();
  // console.log("getAsynOperation()", outData);
  return false;
};
const getAppName = () => {
  return new Promise((resolve, reject) => {
    GetAppName.getAppName((appName: string) => {
      if (appName === "GlobalId") {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
/**
 * @description Provides the the OS platform level language on the user's device. The logic supports
 * both Android platform. Convert xx_YY to xx-YY format as that is the standard format i18next supports.
 */
export const platformLanguage =
  NativeModules?.I18nManager?.localeIdentifier?.replace(/_/, "-");
