import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Apptheme } from "../themes";
import { enableScreens } from "react-native-screens";
import DrawerNavigator from "../navigations/DrawerNavigator";
import { SlidAnimation } from "./SlidAnimation";
import LandingScreen from "../screens/onboarding/landingPage";
import RegisterScreen from "../screens/onboarding/register";
import BackupIdentity from "../screens/onboarding/backupIdentity";
import Security from "../screens/onboarding/security";
import SetPin from "../screens/onboarding/security/passcode/SetPincode";
import ConfirmPincode from "../screens/onboarding/security/passcode/ConfirmPincode";
import uploadDocumentsScreen from "../screens/uploadDocuments";
import LoadingScreen from "../screens/onboarding/LoadingScreen";
import PasswordCheck from "../screens/onboarding/security/passcode/PasswordCheck";
import facePlaceHolderWidget from "../screens/FaceRegister/facePlaceHolderWidget";
import RegisterFace from "../screens/FaceRegister/RegisterFace";
import SuccessFaceRegister from "../screens/FaceRegister/SuccessFaceRegister";
// Before rendering any navigation stack
const animations: any = SlidAnimation;
export default function RootNavigator() {
  enableScreens();
  const Stack = createStackNavigator();

  const beforeLoggedIn = {
    Security: Security,
    facePlaceHolderWidget: facePlaceHolderWidget,
    RegisterFace: RegisterFace,
    LandingScreen: LandingScreen,
    RegisterScreen: RegisterScreen,
    BackupIdentity: BackupIdentity,
    SetPin: SetPin,
    ConfirmPincode: ConfirmPincode,
    uploadDocumentsScreen: uploadDocumentsScreen,
    SuccessFaceRegister: SuccessFaceRegister,
  };

  function AuthStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {Object.entries({
          ...beforeLoggedIn,
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

  return (
    <NavigationContainer theme={Apptheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          options={{
            ...animations,
          }}
          name={"AuthStack"}
          component={AuthStack}
        />
        <Stack.Screen
          options={{
            ...animations,
          }}
          name={"LoadingScreen"}
          component={LoadingScreen}
        />
        <Stack.Screen
          options={{
            ...animations,
          }}
          name={"PasswordCheck"}
          component={PasswordCheck}
        />

        <Stack.Screen
          options={{
            ...animations,
          }}
          name={"DrawerNavigator"}
          component={DrawerNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
