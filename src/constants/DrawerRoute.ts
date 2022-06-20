import { LocalImages } from "./imageUrlConstants";
export const ABOUT_ROUTES = {
  MY_PROFILE: {
    CARD: "myProfile",
    TITLE: "My Profile",
    URI: LocalImages.historyImage,
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
    URI: LocalImages.homeImage,
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
  LOGOUT: {
    URI: LocalImages.logoutImage,
    CARD: "AcceptableUsePolicy",
    TITLE: "Logout",
    SCREEN: "history",
  },
};
