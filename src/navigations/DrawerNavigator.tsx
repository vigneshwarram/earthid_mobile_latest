import { createDrawerNavigator } from "@react-navigation/drawer";
import { BottomMenus } from "../navigations/BottomTabs";
import * as React from "react";
import { Dimensions } from "react-native";
import CustomDrawer from "../navigations/CustomDrawer";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/profiles";
import EditProfileScreen from "../screens/profiles/EditProfile";
import settings from "../screens/settings";
import ShowQrScreen from "../screens/Camera/ShowQrCodeScreen";
import { SlidAnimation } from "./SlidAnimation";
import uploadDocumentsScreen from "../screens/uploadDocuments";
import DocumentPreviewScreen from "../screens/uploadDocuments/DocumentPreviewScreen";
import categoryScreen from "../screens/uploadDocuments/categoryScreen";
import LivenessCameraScreen from "../screens/uploadDocuments/LivenessCameraScreen";
import VerifiDocumentScreen from "../screens/uploadDocuments/VerifiDocumentScreen";
import SetPincode from "../screens/onboarding/security/passcode/SetPincode";
import ConfirmPincode from "../screens/onboarding/security/passcode/ConfirmPincode";
import OTPScreen from "../screens/onboarding/security/passcode/OTPScreen";
import ViewCredential from "../screens/bottomTabs/documentTab/ViewCredebtials";
import CustomizeQr from "../screens/profiles/CustomizeQr";
import backupIdentity from "../screens/onboarding/backupIdentity";

import language from "../screens/settings/Language";
import UpdateAuthentication from "../screens/onboarding/security/UpdateAuthentication";
import AuthBackupIdentity from "../screens/onboarding/backupIdentity/AuthIdentity";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const animations: any = SlidAnimation;

const dashBoardStack = {
  ProfileScreen: ProfileScreen,

  EditProfileScreen: EditProfileScreen,
  settings: settings,
  ShowQrScreen: ShowQrScreen,
  AuthBackupIdentity: AuthBackupIdentity,
  uploadDocumentsScreen: uploadDocumentsScreen,
  DocumentPreviewScreen: DocumentPreviewScreen,
  categoryScreen: categoryScreen,
  LivenessCameraScreen: LivenessCameraScreen,
  VerifiDocumentScreen: VerifiDocumentScreen,
  SetPincode: SetPincode,
  ConfirmPincode: ConfirmPincode,
  OTPScreen: OTPScreen,
  ViewCredential: ViewCredential,
  CustomizeQr: CustomizeQr,
  backupIdentity: backupIdentity,
  language: language,
  UpdateAuthentication: UpdateAuthentication,
};

const tabs = {
  bottomTabs: BottomMenus,
};

function appStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {Object.entries({
        ...tabs,
        ...dashBoardStack,
      }).map(([name, component]) => (
        <Stack.Screen
          key={name}
          options={{
            ...animations,
          }}
          name={name}
          component={component}
        />
      ))}
    </Stack.Navigator>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props: any) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: Dimensions.get("screen").width,
        },
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen
        options={{
          ...animations,
        }}
        name="DrawerStacks"
        component={appStack}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
