import { LocalImages } from "./imageUrlConstants";
export const ABOUT_ROUTES = {
  MY_PROFILE: {
    CARD: "myProfile",
    TITLE: "My Profile",
    URI: LocalImages.profileImage,
    RIGHT_ICON: LocalImages.sideArrowImage,
    SCREEN: "profile",
  },
  HOME: {
    CARD: "UserAgreement",
    TITLE: "Home",
    URI: LocalImages.homeImage,
    SCREEN: "home",
  },
  DOCUMENT: {
    URI: LocalImages.documentsImage,
    CARD: "MerchantAgreement",
    TITLE: "Document",
    SCREEN: "document",
  },
  HISTORY: {
    URI: LocalImages.historyImage,
    CARD: "AcceptableUsePolicy",
    TITLE: "History",
    SCREEN: "history",
  },
  SETTINGS: {
    RIGHT_ICON: LocalImages.sideArrowImage,
    URI: LocalImages.settingsImage,
    CARD: "AcceptableUsePolicy",
    TITLE: "Setting",
    SCREEN: "history",
  },
  ABOUT: {
    URI: LocalImages.documentsImage,
    CARD: "AcceptableUsePolicy",
    TITLE: "About Us",
    SCREEN: "history",
  },
  TERMS: {
    URI: LocalImages.termsImage,
    CARD: "AcceptableUsePolicy",
    TITLE: "Term & condition",
    SCREEN: "history",
  },
  IDENTITY: {
    RIGHT_ICON: LocalImages.sideArrowImage,
    URI: LocalImages.historyImage,
    CARD: "AcceptableUsePolicy",
    TITLE: "Bachup Identity",
    SCREEN: "history",
  },
  DELETE: {
    URI: LocalImages.deleteImage,
    CARD: "AcceptableUsePolicy",
    TITLE: "Delete Your Identity",
    SCREEN: "history",
  },
  LOGOUT: {
    URI: LocalImages.logoutImage,
    CARD: "AcceptableUsePolicy",
    TITLE: "Logout",
    SCREEN: "history",
  },
};
