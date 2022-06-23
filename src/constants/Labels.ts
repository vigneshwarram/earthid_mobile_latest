import { LocalImages } from "./imageUrlConstants";

export const SCREENS = {
  HOMESCREEN: {
    avatarName: "Robert Downey",
    appName: "Global ID",
    category: "CATEGORIES",
    documentLabel: "BY MOST FREQUENTLY USED DOCUMENTS",
    upload: "UPLOADED DOCUMENTS",
    History: "HISTORY",
    SocialMedialList: [
      {
        TITLE: "website",
        URI: LocalImages.SOCIAL_MEDIA_.webImage,
        DOMAIN: "https://yourdomain.com",
      },
      {
        TITLE: "facebook",
        URI: LocalImages.SOCIAL_MEDIA_.facebookImage,
        DOMAIN: "https://yourdomain.com",
      },
      {
        TITLE: "twitter",
        URI: LocalImages.SOCIAL_MEDIA_.twitterImage,
        DOMAIN: "https://yourdomain.com",
      },
      {
        TITLE: "instagram",
        URI: LocalImages.SOCIAL_MEDIA_.instagramImage,
        DOMAIN: "https://yourdomain.com",
      },
      {
        TITLE: "linkeid",
        URI: LocalImages.SOCIAL_MEDIA_.linkdInImage,
        DOMAIN: "https://yourdomain.com",
      },
      {
        TITLE: "telegram",
        URI: LocalImages.SOCIAL_MEDIA_.telegramImage,
        DOMAIN: "https://yourdomain.com",
      },
    ],
    DocumentList: [
      {
        TITLE: "Passport",
        URI: LocalImages.CATEGORIES.personalcardImage,
        COLOR: "#D7EFFB",
      },
      {
        TITLE: "National ID",
        URI: LocalImages.CATEGORIES.educationImage,
        COLOR: "#FFDD9B",
      },
    ],
    categoryList: [
      {
        TITLE: "ID",
        URI: LocalImages.CATEGORIES.personalcardImage,
        COLOR: "#D7EFFB",
      },
      {
        TITLE: "Education",
        URI: LocalImages.CATEGORIES.educationImage,
        COLOR: "#FFDD9B",
      },
      {
        TITLE: "Insurance",
        URI: LocalImages.CATEGORIES.insuranceImage,
        COLOR: "#C5BDF6",
      },
      {
        TITLE: "Travel",
        URI: LocalImages.CATEGORIES.travelImage,
        COLOR: "#F5BCE8",
      },
    ],
    documentsDetailsList: [
      {
        ID: 1,
        TITLE: "RobertD_passport",
        SUBTITLE: "Uploaded: 21/05/2022",
        URI: LocalImages.documentsImage,
        COLOR: "#D7EFFB",
      },
      {
        ID: 2,
        TITLE: "GBAMembership",
        SUBTITLE: "Uploaded: 21/05/2022",
        URI: LocalImages.documentsImage,
        COLOR: "#FFDD9B",
      },
      {
        ID: 3,
        TITLE: "GBAMembership",
        SUBTITLE: "Uploaded: 21/05/2022",
        URI: LocalImages.documentsImage,
        COLOR: "#C5BDF6",
      },
      {
        ID: 4,
        TITLE: "GBAMembership",
        SUBTITLE: "Uploaded: 21/05/2022",
        URI: LocalImages.documentsImage,
        COLOR: "#F5BCE8",
      },
      {
        ID: 5,
        TITLE: "GBAMembership",
        SUBTITLE: "Uploaded: 21/05/2022",
        URI: LocalImages.CATEGORIES.travelImage,
        COLOR: "#F5BCE8",
      },
      {
        ID: 6,
        TITLE: "GBAMembership",
        SUBTITLE: "Uploaded: 21/05/2022",
        URI: LocalImages.CATEGORIES.travelImage,
        COLOR: "#F5BCE8",
      },
    ],
  },
  LANDINGSCREEN: {
    setUpId: "Set Up Your GlobaliD",
    instruction: "Setup with one of our available registration options",
  },
  BACKUPIDENTYSCREEN: {
    instruction:
      "We strongly recommend to save this QR code at a secure location, at it will be needed to recover or port your Global Id in future.",
    instructions: "Save it like, millions of dollar it may one day may worth.",
  },
  SECURITYSCREEN: {
    instruction: "Locking this app is required for added security ",
    instructions:
      "To keep your data secure, we store your  personal data on your device, not on the  centralised servers.",
  },
};
