import { Screens } from "../themes";
import { LocalImages } from "./imageUrlConstants";
import { SCREENS } from "./Labels";
export const ABOUT_ROUTES = {
  MY_PROFILE: {
    CARD: "myProfile",
    TITLE: SCREENS.DRAWERMENUTITLES.MY_PROFILE,
    URI: LocalImages.profileImage,
    RIGHT_ICON: LocalImages.sideArrowImage,
    SCREEN: "DrawerStacks",
    COLOR: "#D7EFFB",
  },
  HOME: {
    CARD: "UserAgreement",
    TITLE:SCREENS.DRAWERMENUTITLES.HOME,
    URI: LocalImages.homeImage,
    SCREEN: "Home",
    COLOR: "#FFDD9B",
  },
  DOCUMENT: {
    URI: LocalImages.documentsImage,
    CARD: "MerchantAgreement",
    TITLE: SCREENS.DRAWERMENUTITLES.DOCUMENT,
    SCREEN: "Document",
    COLOR: "#C5BDF6",
  },
  HISTORY: {
    URI: LocalImages.historyImage,
    CARD: "AcceptableUsePolicy",
    TITLE:SCREENS.DRAWERMENUTITLES.HISTORY,
    SCREEN: "History",
    COLOR: "#F6BDE9",
  },
  SETTINGS: {
    RIGHT_ICON: LocalImages.sideArrowImage,
    URI: LocalImages.settingsImage,
    CARD: "AcceptableUsePolicy",
    TITLE: SCREENS.DRAWERMENUTITLES.SETTING,
    SCREEN: "settings",
    COLOR: "#BFF5CE",
  },

  LANGUAGE: {
    RIGHT_ICON: LocalImages.sideArrowImage,
    URI: LocalImages.translateImage,
    CARD: "AcceptableUsePolicy",
    TITLE: SCREENS.DRAWERMENUTITLES.LANGUAGE,
    SCREEN: "language",
    COLOR: "#BFF5CE",
  },
  ABOUT: {
    URI: LocalImages.documentsImage,
    CARD: "AcceptableUsePolicy",
    TITLE:SCREENS.DRAWERMENUTITLES.ABOUT_US,
    SCREEN: "history",
    COLOR: "#FFAFAF",
  },
  TERMS: {
    URI: LocalImages.termsImage,
    CARD: "AcceptableUsePolicy",
    TITLE:SCREENS.DRAWERMENUTITLES.TERM_CONDITION,
    SCREEN: "history",
    COLOR: "#D7EFFB",
  },
  IDENTITY: {
    RIGHT_ICON: LocalImages.sideArrowImage,
    URI: LocalImages.historyImage,
    CARD: "AcceptableUsePolicy",
    TITLE: SCREENS.DRAWERMENUTITLES.BACKUP,
    SCREEN: "backupIdentity",
    COLOR: "#FFDD9B",
  },
  DELETE: {
    URI: LocalImages.deleteImage,
    CARD: "AcceptableUsePolicy",
    TITLE: SCREENS.DRAWERMENUTITLES.DELETE_IDENTITY,
    SCREEN: "history",
    COLOR: "#C5BDF6",
  },
  LOGOUT: {
    URI: LocalImages.logoutImage,
    CARD: "AcceptableUsePolicy",
    TITLE: SCREENS.DRAWERMENUTITLES.LOGOUT,
    SCREEN: "Logout",
    COLOR: "#F6BDE9",
  },
};
