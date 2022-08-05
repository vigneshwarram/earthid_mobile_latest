import { LocalImages } from "./imageUrlConstants";

export const SCREENS = {
  HOMESCREEN: {
    avatarName: "Robert Downey",
    appName: "Earth ID",
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
    CategoryCustomiseList: [
      {
        TITLE: "Full Name",
        VALUE: "Roberty Dowry",
        URI: LocalImages.SOCIAL_MEDIA_.webImage,
        DOMAIN: "https://yourdomain.com",
        CHECKED: true,
      },
      {
        TITLE: "Date of Birth",
        VALUE: "25/12/1965",
        URI: LocalImages.SOCIAL_MEDIA_.webImage,
        DOMAIN: "https://yourdomain.com",
        CHECKED: true,
      },
      {
        TITLE: "Mobile Number",
        VALUE: "+91 7373834595",
        URI: LocalImages.SOCIAL_MEDIA_.webImage,
        DOMAIN: "https://yourdomain.com",
        CHECKED: true,
      },
      {
        TITLE: "Email",
        VALUE: "vicky@yopmail.com",
        URI: LocalImages.SOCIAL_MEDIA_.webImage,
        DOMAIN: "https://yourdomain.com",
        CHECKED: true,
      },

      {
        TITLE: "website",
        URI: LocalImages.SOCIAL_MEDIA_.webImage,
        VALUE: "https://yourdomain.com",
        CHECKED: true,
      },
      {
        TITLE: "facebook",
        URI: LocalImages.SOCIAL_MEDIA_.facebookImage,
        VALUE: "https://yourdomain.com",
        CHECKED: true,
      },
      {
        TITLE: "twitter",
        URI: LocalImages.SOCIAL_MEDIA_.twitterImage,
        VALUE: "https://yourdomain.com",
        CHECKED: true,
      },
      {
        TITLE: "instagram",
        URI: LocalImages.SOCIAL_MEDIA_.instagramImage,
        VALUE: "https://yourdomain.com",
        CHECKED: true,
      },
      {
        TITLE: "linkeid",
        URI: LocalImages.SOCIAL_MEDIA_.linkdInImage,
        VALUE: "https://yourdomain.com",
        CHECKED: true,
      },
      {
        TITLE: "telegram",
        URI: LocalImages.SOCIAL_MEDIA_.telegramImage,
        VALUE: "https://yourdomain.com",
        CHECKED: true,
      },
    ],

    documentsDetailsList: [
      {
        ID: 1,
        TITLE: "RobertD_passport",
        SUBTITLE: "Uploaded: 21/05/2022",
        URI: LocalImages.documentsImage,
        COLOR: "#D7EFFB",
        UPLOADIMAGECOLOR: "#94c0d6",
      },
      {
        ID: 2,
        TITLE: "GBAMembership",
        SUBTITLE: "Uploaded: 21/05/2022",
        URI: LocalImages.documentsImage,
        COLOR: "#FFDD9B",
        UPLOADIMAGECOLOR: "#e2b96a",
      },
      {
        ID: 3,
        TITLE: "GBAMembership",
        SUBTITLE: "Uploaded: 21/05/2022",
        URI: LocalImages.documentsImage,
        COLOR: "#C5BDF6",
        UPLOADIMAGECOLOR: "#8881b6",
      },
      {
        ID: 4,
        TITLE: "GBAMembership",
        SUBTITLE: "Uploaded: 21/05/2022",
        URI: LocalImages.documentsImage,
        COLOR: "#F5BCE8",
        UPLOADIMAGECOLOR: "#aa6d9c",
      },
      {
        ID: 5,
        TITLE: "GBAMembership",
        SUBTITLE: "Uploaded: 21/05/2022",
        URI: LocalImages.CATEGORIES.travelImage,
        COLOR: "#F5BCE8",
        UPLOADIMAGECOLOR: "#94c0d6",
      },
      {
        ID: 6,
        TITLE: "GBAMembership",
        SUBTITLE: "Uploaded: 21/05/2022",
        URI: LocalImages.CATEGORIES.travelImage,
        COLOR: "#F5BCE8",
        UPLOADIMAGECOLOR: "#8881b6",
      },
    ],
  },
  LANDINGSCREEN: {
    setUpId: "Set Up Your EarthiD",
    instruction: "Setup with one of our available registration options",
  },
  BACKUPIDENTYSCREEN: {
    instruction:
      "We strongly recommend to save this QR code at a secure location, at it will be needed to recover or port your Earth Id in future.",
    instructions: "Save it like, millions of dollar it may one day may worth.",
  },
  SECURITYSCREEN: {
    instruction: "Locking this app is required for added security ",
    instructions:
      "To keep your data secure, we store your  personal data on your device, not on the  centralised servers.",
    passcordInstruction:
      "To keep your data secure, we store your  personal data on your device, not on the  centralised servers.",
    passcordInstructions:
      "Secure Earth ID with 6 - digit code that will remember.",
    confirmInstruction: "Please confirm your 6 - digit passcode for go further",
  },
  SHOWQRSCREEN: {
    instruction: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the`,
  },
  CATEGORYSCREEN: {
    categories: [
      {
        title: "ID",
        color: "#D7EFFB",
      },
      {
        title: "Education",
        color: "#FFDD9B",
      },
      {
        title: "Employment",
        color: "rgba(255, 175, 175, 1)",
      },
      {
        title: "Insurance",
        color: "rgba(255, 221, 155, 1)",
      },
      {
        title: "Healthcare",
        color: "rgba(191, 245, 206, 1)",
      },
      {
        title: "Travel",
        color: "rgba(246, 189, 233, 1)",
      },
    ],
  },
};
