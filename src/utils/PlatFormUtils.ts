import { NativeModules, Platform } from "react-native";
import GetAppName from "react-native-get-app-name";
/**
 * @description Checks if the os is andriod or not.
 */
export const isAndroid = Platform.OS === "android";

export const isEarthId = () => {
  let app = "EarthId";
  let appConfig = true;
  GetAppName.getAppName((appName: string) => {
    console.log("appName===>", appName);
    if (appName !== app) {
      appConfig = false;
    }
  });
  return appConfig;
};

/**
 * @description Provides the the OS platform level language on the user's device. The logic supports
 * both Android platform. Convert xx_YY to xx-YY format as that is the standard format i18next supports.
 */
export const platformLanguage =
  NativeModules?.I18nManager?.localeIdentifier?.replace(/_/, "-");
